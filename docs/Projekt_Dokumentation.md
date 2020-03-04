# Projekt Dokumentation

> Kann den Projektantrag in eine Projekt-Dokumentation überführen. In der Projekt-Dokumentation werden die für dieses Modul relevanten Funktionen der Applikation beschrieben und erklärt und die Verwendung der Dateiformate begründet.
 
## Kompetenz 3B & 4B

> Kann Multimedia-Inhalte dynamisch für unterschiedliche Geräte, Betriebssysteme und Browser optimieren. Dabei unterstützt er / sie die wichtigsten Betriebssystem und Browser.

> Zeigt die Multimedia-Inhalte auf unterschiedlichen Bildschirmgrössen korrekt an. (Responsive Web Design).

Es kann auf der `/b2b/admin`-Seite ein Video hochgeladen werden. Dieses wird (künftig) danach zufällig dem Benutzer angezeigt.
Dieses Video wird dann in der Grösse auf verschiedene Stufen herunterskaliert, dass je nach Internetverbindung eine unterschiedliche Auflösung verwendet werden kann.
Aktuell werden die Videos in folgende Höhen konvertiert. Die Ratio ist dabei stets gleich:
`144p`, `240p`, `360p`, `480p`, `720p`, `1080p`

## Kompetenz 2C
> Erstellt Multimedia-Inhalte dynamisch mithilfe geigneter Geräten, Bibliotheken, APIs selbst oder ladet Multimedia-Inhalte über ein Formular in die Applikation. Beim Upload beachtet er / sie die Filegrösse und schrenkt mögliche Dateiformate ein.

Die Videos werden über HTTP auf den Server übertragen und dort über eine [Filesystem Abstraktion](https://flysystem.thephpleague.com/docs/) gespeichert.
Dateiformate sowie die Grösse werden validiert.

## Kompetenz 3C
> Verabeitet die generierten oder hochgeladenen Multimedia-Inhalte weiter in dem er / sie die Inhalte dynamisch verändert, kombiniert oder analysiert.

Zuerst werden die Dateien skaliert und angepasst. Bei der Skalierung werden diese zusätzlich nochmals überprüft, ob die Höhe nicht über der zu skalierenden Höhe liegt.
Die verarbeiteten Dateien werden dann über einen Stream an den Client gesendet.


## Kompetenz 4C
> Achtet auf Usability der Webseite. Dazu bietet er / sie benutzerdefinierte Such- / Filterfunktionen wie Filter, Pagination oder Suche an. Leitet den Benutzer mit sinnvollen Meldungen durch alle Prozesse. Validiert HTML und CSS.

Die Bedienbarkeit der Webseite ist einfach gehalten. Wenn man sich als Administrator anmeldet kann man zusätzlich noch Dateien Hochladen.
Sollte man sich als normaler User anmelden, kann man lediglich Videos ansehen. Künftig wird man auch Fragen zu dem Video beantworten können.
Ebenfalls sind die URLs SEO-freundlich gehalten. Die verwendete Technologie (PHP) ist nicht aus der URL heraus sichtbar.
Bei einem Fileupload wird der Benutzer auch informiert, ob der Upload erfolgreich war, oder ob dieser abgebrochen wurde.
Um es einfach zu halten wird im Fehlerfall immer die gleiche Meldung ausgegeben.
Wenn die Seite geladen wird, werden ebenfalls alle bereits verarbeteiteten Dateien aufgelistet. Diese kann man über das Suchfeld
oberhalb der Liste filtern. Man kann nach Kampagnennamen, Sprache, Auflösung oder Dateinamen sortieren.

## Kompetenz 5C

Wie bereits in meinem Lernjournal erwähnt, habe ich das Projekt mit GitHub Projects gemacht.
GitHub Projects ist ausreichend, wenn man ein paar Issues verwalten möchte.
Man kann Notizen sowie GitHub Issues direkt über ein Kanban-Board bearbeiten. 
