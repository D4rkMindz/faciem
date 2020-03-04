# Technische Dokumentation

Die technische Dokumentation beschreibt die Umsetzung der im [Kompetenzraster](https://drive.google.com/file/d/1F9K_arJQagTyYQcXg1lKKz-bCCXdQ4vQ/view) erwähnten Punkte aus technischer Sicht.

## Kompetenz 3B
> Kann Multimedia-Inhalte dynamisch für unterschiedliche Geräte, Betriebssysteme und Browser optimieren. Dabei unterstützt er / sie die wichtigsten Betriebssystem und Browser.

Nuxt wird grundsätzlich von Google Chrome und Mozilla Firefox unterstützt. 
Internet Explorer und Edge wird nicht offiziell unterstützt.

## Kompetenz 4B
> Zeigt die Multimedia-Inhalte auf unterschiedlichen Bildschirmgrössen korrekt an. (Responsive Web Design).

Die Webseite ist Responsive. Je nach Bildschirmbreite passt sich die Applikation an.
Die Navigation wird zum Beispiel auf mobilen Geräten hinter einem Burgermenu versteckt.
Ebenfalls wird über die Library [network-speed](https://www.npmjs.com/package/network-speed) die bestehende Internetgeschwindigkeit gemessen.
Basierend auf der Messung wird dann ein Video in entsprechender Qualität ausgewählt.

```js
export default {
  // ... can be found in pages/watch/index
  async testNetwork() {
    const baseUrl = 'http://eu.httpbin.org/stream-bytes/500000';
    const fileSize = 500000;
    const testNetworkSpeed = new NetworkSpeed();
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSize);
    this.speed = speed;

    let resolution = 144;
    if (speed.kbps <= SpeedLimits.LOW) {
      resolution = 144;
    }
    if (speed.kbps > SpeedLimits.LOW && speed.kbps <= SpeedLimits.FWQVGA) {
      resolution = 240;
    }
    if (speed.kbps > SpeedLimits.FWQVGA && speed.kbps <= SpeedLimits.nHD) {
      resolution = 360;
    }
    if (speed.kbps > SpeedLimits.nHD && speed.kbps > SpeedLimits.FWVGA) {
      resolution = 480;
    }
    if (speed.kbps > SpeedLimits.FWVGA && speed.kbps <= SpeedLimits.HD) {
      resolution = 720;
    }
    if (speed.kbps > SpeedLimits.HD) {
      resolution = 1080;
    }

    this.resolution = resolution;
  },
};
```

## Kompetenz 2C
> Erstellt Multimedia-Inhalte dynamisch mithilfe geigneter Geräten, Bibliotheken, APIs selbst oder ladet Multimedia-Inhalte über ein Formular in die Applikation. Beim Upload beachtet er / sie die Filegrösse und schrenkt mögliche Dateiformate ein.

[FFMPeg](https://www.ffmpeg.org/download.html) ist ein Programm, welches die Bearbeitung von Bild und Videodateien über eine CLI ermöglicht.
In PHP gibt es einen Objektorientierten Wrapper für dieses Programm. 
[PHP-FFMpeg/PHP-FFMpeg](https://github.com/PHP-FFMpeg/PHP-FFMpeg) ermöglicht das anpassen und konvertieren der Dateien.

```php
<?

$ffmpeg = FFMpeg\FFMpeg::create();
$video = $ffmpeg->open('video.mpg');
$video
    ->filters()
    ->resize(new FFMpeg\Coordinate\Dimension(320, 240))
    ->synchronize();
$video
    ->frame(FFMpeg\Coordinate\TimeCode::fromSeconds(10))
    ->save('frame.jpg');
$video
    ->save(new FFMpeg\Format\Video\X264(), 'export-x264.mp4')
    ->save(new FFMpeg\Format\Video\WMV(), 'export-wmv.wmv')
    ->save(new FFMpeg\Format\Video\WebM(), 'export-webm.webm');
```

Ähnlicher Code ist im Projekt unter `src/Service/AMQP/Video/ResizeVideoService` sowie unter `src/Service/FileSystem/FFMpeg` zu finden.

Bei dieser Applikation wird jedes Bild so konvertiert, dass es je ein Video mit einer der folgenden Höhen hat (die Ratio bleibt hier gleich):
`144p`, `240p`, `360p`, `480p`, `720p`, `1080p`

## Kompetenz 3C
> Verabeitet die generierten oder hochgeladenen Multimedia-Inhalte weiter in dem er / sie die Inhalte dynamisch verändert, kombiniert oder analysiert. 

Die einzige Manipulation von Bilddateien erfolgt bei der Skalierung der Videos.

## Kompetenz 4C
> Achtet auf Usability der Webseite. Dazu bietet er / sie benutzerdefinierte Such- / Filterfunktionen wie Filter, Pagination oder Suche an. Leitet den Benutzer mit sinnvollen Meldungen durch alle Prozesse. Validiert HTML und CSS.

In der Applikation wird der Benutzer über den Upload einer Datei informiert. Ebenso werden diese, nach einem Page-Refresh auch direkt angezeigt.
Es wird dargestellt, welche Auflösung die Bilder haben und welche Formate. Zusätzlich werden noch weitere, eher unwichtigere, Daten ausgegeben.
Wenn der Benutzer nach etwas konkret suchen möchte, dann kann er dies in dem Suchfeld auf der Adminseite machen.


