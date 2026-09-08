<?php

namespace Database\Seeders;

use App\Models\Campaign;
use Illuminate\Database\Seeder;

class CampaignTemplateSeeder extends Seeder
{
    public function run(): void
    {
        Campaign::firstOrCreate(['slug' => 'vorlage-giveaway-kampagne'], [
            'title' => 'VORLAGE – Ihre Giveaway-Kampagne',
            'description' => 'Ein besonderer Anlass. Eine besondere Chance.
Nehmen Sie an unserer Aktion teil und entdecken Sie die folgenden Giveaways. Füllen Sie das Teilnahmeformular aus und bestätigen Sie die Teilnahmebedingungen.

VOR VERÖFFENTLICHUNG: Anlass, Zeitraum und konkrete Gewinne ergänzen.',
            'giveaways' => [
                ['title' => 'Giveaway 1 – Hauptgewinn', 'description' => 'Beschreiben Sie hier den konkreten Gewinn: Produkt oder Gutschein, Anzahl, Wert und enthaltene Leistungen. Laden Sie das passende Bild hoch.', 'image' => null, 'image_alt' => ''],
                ['title' => 'Giveaway 2 – Weiterer Gewinn', 'description' => 'Beschreiben Sie hier einen weiteren Gewinn. Nicht benötigte Giveaways können entfernt oder weitere hinzugefügt werden.', 'image' => null, 'image_alt' => ''],
            ],
            'terms' => 'VORLAGE – VOR VERÖFFENTLICHUNG VERVOLLSTÄNDIGEN

Veranstalter: [Name und Kontakt]
Teilnahmezeitraum: [Beginn und Ende]
Teilnahmeberechtigung: [Alter, Wohnsitz und weitere Voraussetzungen]
Gewinne: [Beschreibung, Anzahl und Wert]
Ermittlung der Gewinner: [Verfahren und Datum]
Benachrichtigung und Übergabe: [Ablauf und Fristen]
Weitere Bedingungen: [zutreffende Regelungen]
Datenschutz und Kontakt: [Verweis und Kontaktstelle]',
            'is_published' => false,
        ]);
    }
}
