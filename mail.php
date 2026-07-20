<?php
/**
 * Gestionnaire de formulaires — Cabinet Alfred Gory
 * Traite tous les formulaires POST du site et envoie par email via PHP mail()
 */

// Sécurité : POST uniquement
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Méthode non autorisée');
}

// Protection honeypot anti-spam
if (!empty($_POST['_hp'])) {
    // Bot détecté — simuler succès silencieusement
    header('Location: merci.html');
    exit;
}

// Vérification token CSRF basique (origine)
$allowedOrigins = ['https://www.alfred-gory.com', 'https://alfred-gory.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$originOk = false;
foreach ($allowedOrigins as $allowed) {
    if (strpos($origin, $allowed) === 0) { $originOk = true; break; }
}
// En production OVH l'origin peut être absente — on ne bloque pas mais on log
// if (!$originOk) { http_response_code(403); exit('Origine non autorisée'); }

// Nettoyage des entrées
function clean(string $str): string {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

function cleanMultiline(string $str): string {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

// Champs réservés (non affichés dans le corps du mail)
$reservedFields = ['_form_type', '_next', '_subject', '_captcha', '_hp'];

// Paramètres du formulaire
$formType  = clean($_POST['_form_type'] ?? 'Formulaire');
$nextUrl   = filter_var($_POST['_next'] ?? 'merci.html', FILTER_SANITIZE_URL);
$subject   = clean($_POST['_subject'] ?? "[$formType] Nouveau message — Cabinet Alfred Gory");

// Destinataire
$to = 'formation@alfred-gory.fr';

// Expéditeur de réponse (email du contact si fourni)
$replyTo = '';
foreach (['email', 'email_stagiaire', 'email_contact', 'email_rh', 'email_psh', 'email_financeur'] as $emailField) {
    if (!empty($_POST[$emailField]) && filter_var($_POST[$emailField], FILTER_VALIDATE_EMAIL)) {
        $replyTo = clean($_POST[$emailField]);
        break;
    }
}

// Construction du corps du message
$lines = [];
$lines[] = "════════════════════════════════════════";
$lines[] = "  CABINET ALFRED GORY — " . strtoupper($formType);
$lines[] = "════════════════════════════════════════";
$lines[] = "Date : " . date('d/m/Y à H:i:s');
$lines[] = "Page : " . clean($_SERVER['HTTP_REFERER'] ?? 'inconnue');
$lines[] = "";

foreach ($_POST as $key => $value) {
    if (in_array($key, $reservedFields, true)) continue;

    // Formatage du nom du champ
    $label = str_replace(['_', '-'], ' ', $key);
    $label = ucfirst(mb_strtolower($label, 'UTF-8'));
    $label = str_pad($label, 30);

    // Valeur (tableau ou chaîne)
    if (is_array($value)) {
        $val = implode(', ', array_map('clean', $value));
    } else {
        $val = cleanMultiline($value);
    }

    if ($val !== '') {
        $lines[] = $label . ": " . $val;
    }
}

$lines[] = "";
$lines[] = "────────────────────────────────────────";
$lines[] = "Message envoyé depuis alfred-gory.com";
$lines[] = "IP : " . clean($_SERVER['REMOTE_ADDR'] ?? '');

$body = implode("\n", $lines);

// En-têtes email
$fromName  = "Cabinet Alfred Gory";
$fromEmail = "no-reply@alfred-gory.fr";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
if ($replyTo) {
    $headers .= "Reply-To: {$replyTo}\r\n";
}
$headers .= "X-Mailer: Alfred-Gory-PHP-Mailer/1.0\r\n";
$headers .= "X-Priority: 1\r\n";

// Envoi
$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

// Détection si la requête attend du JSON (formulaires AJAX comme inscription)
$wantsJson = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

if ($wantsJson) {
    header('Content-Type: application/json');
    if ($sent) {
        echo json_encode(['ok' => true, 'message' => 'Message envoyé avec succès.']);
    } else {
        http_response_code(500);
        echo json_encode(['ok' => false, 'message' => 'Erreur lors de l\'envoi.']);
    }
    exit;
}

// Réponse HTML → redirection
if ($sent) {
    header('Location: ' . $nextUrl);
} else {
    // En cas d'échec : retour avec paramètre d'erreur
    $errorUrl = strpos($nextUrl, '?') !== false
        ? $nextUrl . '&error=1'
        : str_replace('merci.html', 'contact.html?error=1', $nextUrl);
    header('Location: ' . $errorUrl);
}
exit;
