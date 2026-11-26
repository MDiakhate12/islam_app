"""Écran « Pourquoi c’est étonnant » de la mosaïque : trois cartes par signe.

Chaque carte : h (titre), t (texte), et au choix img (photo libre de Wikimedia Commons, créditée)
ou ar + key (extrait du Coran, texte de Médine, vérifié contre le verset key par build.py).
calc (facultatif) : le calcul en une ligne. links : les sources de la carte.
Essai sur trois signes avant de l’étendre aux autres.
"""

COMMONS = "https://thumb.wikimedia.org/wikipedia/commons/thumb/"

WHY = {
  "montagnes": [
    {"h": "Ce qu’on voit",
     "img": {"src": COMMONS + "e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/500px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
             "alt": "La face nord de l’Everest, vue du Tibet", "credit": "Luca Galuzzi · CC BY-SA 2.5",
             "href": "https://commons.wikimedia.org/wiki/File:Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg"},
     "t": "Un sommet posé sur la plaine. À l’œil nu, rien ne laisse deviner qu’une montagne se prolonge sous terre.",
     "links": []},
    {"h": "Ce qu’on a mesuré",
     "img": {"src": COMMONS + "1/11/George_Biddell_Airy_%281801-1892%29%2C_by_John_Collier.jpg/500px-George_Biddell_Airy_%281801-1892%29%2C_by_John_Collier.jpg",
             "alt": "Portrait de George Airy, astronome royal, par John Collier", "credit": "John Collier · domaine public",
             "href": "https://commons.wikimedia.org/wiki/File:George_Biddell_Airy_(1801-1892),_by_John_Collier.jpg"},
     "calc": "racine ≈ 6 × hauteur",
     "t": "En 1855, l’astronome George Airy montre qu’une montagne ne tient que portée par une racine de croûte légère, enfoncée dans le manteau plus dense. Il le compare à un radeau : la bûche qui dépasse le plus est aussi celle qui plonge le plus. Avec les densités mesurées aujourd’hui, la racine fait environ six fois la hauteur du relief. Dans les années 1990, les ondes sismiques la mesurent sous le Tibet : environ 70 km de croûte, le double d’une croûte ordinaire.",
     "links": [["Airy, 1855", "https://archive.org/details/philosophicaltra1451roya/page/101/mode/1up"],
               ["Zhao et al., Nature, 1993", "https://doi.org/10.1038/366557a0"],
               ["Shin et al., 2015", "https://doi.org/10.1038/srep11681"]]},
    {"h": "Ce que dit le Coran", "ar": "وَٱلۡجِبَالَ أَوۡتَادٗا", "key": "78:7",
     "t": "« Et les montagnes, des piquets » (78:7). Le watad, dit Ibn ʿĀshūr, est un bâton épais, plus fin en bas, qu’on enfonce dans le sol pour tenir les cordes de la tente. Une fois planté, on n’en voit plus que la tête.",
     "links": [["Tafsīr d’Ibn ʿĀshūr", "https://tafsir.app/ibn-aashoor/78/7"]]},
  ],
  "textes-des-pyramides": [
    {"h": "Ce qui était gravé",
     "img": {"src": COMMONS + "2/21/Cartouches_of_Pepi_I_and_Pyramid_Texts._Limestone_block_fragment_from_the_debris_of_the_north_wall_of_the_antechamber_within_the_pyramid_of_Pepi_I_at_Saqqara._Petrie_Museum.jpg/500px-thumbnail.jpg",
             "alt": "Bloc gravé de la pyramide de Pépi Ier, avec ses cartouches et des Textes des pyramides (Petrie Museum, Londres)",
             "credit": "Osama Shukir Muhammed Amin · CC BY-SA 4.0",
             "href": "https://commons.wikimedia.org/wiki/File:Cartouches_of_Pepi_I_and_Pyramid_Texts._Limestone_block_fragment_from_the_debris_of_the_north_wall_of_the_antechamber_within_the_pyramid_of_Pepi_I_at_Saqqara._Petrie_Museum.jpg"},
     "t": "Il y a plus de 4 000 ans, sur les murs des chambres funéraires de Pépi Ier et de Pépi II, des colonnes de hiéroglyphes promettent au roi mort : « le ciel pleure pour toi, la terre tremble pour toi ». Pour l’Égypte, le roi est un dieu, et le monde entier doit le pleurer.",
     "links": [["Allen, Pyramid Texts, formule 553", "https://www.sbl-site.org/wp-content/uploads/2024/11/AllenPyramid.pdf"],
               ["Texte égyptien (TLA)", "https://thesaurus-linguae-aegyptiae.de/text/WCAHVJTYHZDPDAZ5MW6VOBXHRI/sentences?page=3"]]},
    {"h": "Ce qui s’était perdu",
     "img": {"src": COMMONS + "2/23/Rosetta_Stone.JPG/500px-Rosetta_Stone.JPG",
             "alt": "La pierre de Rosette, au British Museum", "credit": "Hans Hillewaert · CC BY-SA 4.0",
             "href": "https://commons.wikimedia.org/wiki/File:Rosetta_Stone.JPG"},
     "t": "La dernière inscription en hiéroglyphes date de 394. Au VIIe siècle, plus personne ne sait les lire, et ces textes restent enfouis au cœur des pyramides. Il faut attendre la pierre de Rosette et Champollion, en 1822, pour relire l’écriture, puis Gaston Maspero, en 1880-1881, pour découvrir les textes.",
     "links": [["Pierre de Rosette, British Museum", "https://www.britishmuseum.org/collection/object/Y_EA24"],
               ["Champollion, 1822", "https://fr.wikipedia.org/wiki/Lettre_%C3%A0_M._Dacier"],
               ["Maspero, 1894", "https://archive.org/details/lesinscriptionsd00maspuoft"]]},
    {"h": "Ce que dit le Coran", "ar": "فَمَا بَكَتۡ عَلَيۡهِمُ ٱلسَّمَآءُ وَٱلۡأَرۡضُ", "key": "44:29",
     "t": "« Ni le ciel ni la terre ne pleurèrent sur eux » (44:29). Le Coran dit de Pharaon l’exact inverse de la promesse gravée pour les rois d’Égypte.",
     "links": [["Tafsīr de Qurṭubī", "https://quran.com/44/29/tafsirs/ar-tafseer-al-qurtubi"],
               ["Tafsīr d’Ibn ʿĀshūr", "https://tafsir.app/ibn-aashoor/44/29"]]},
  ],
  "poids-nuages": [
    {"h": "Ce qu’on voit",
     "img": {"src": COMMONS + "7/7b/Cumulus_humilis_Sch%C3%B6nwald_im_Schwarzwald_20180810.jpg/500px-Cumulus_humilis_Sch%C3%B6nwald_im_Schwarzwald_20180810.jpg",
             "alt": "Petits cumulus dans un ciel bleu, en Forêt-Noire", "credit": "Uoaei1 · CC BY-SA 4.0",
             "href": "https://commons.wikimedia.org/wiki/File:Cumulus_humilis_Sch%C3%B6nwald_im_Schwarzwald_20180810.jpg"},
     "t": "Une boule de coton, plus légère que l’air, semble-t-il. À l’œil, rien ne dit qu’un nuage pèse.",
     "links": []},
    {"h": "Ce qu’on a mesuré",
     "img": {"src": COMMONS + "c/c0/Amboseli_National_Park%2C_Home_of_The_African_Elephant_%2851209270682%29.jpg/500px-Amboseli_National_Park%2C_Home_of_The_African_Elephant_%2851209270682%29.jpg",
             "alt": "Un troupeau d’éléphants dans le parc d’Amboseli, au Kenya", "credit": "Ray in Manila · CC BY 2.0",
             "href": "https://commons.wikimedia.org/wiki/File:Amboseli_National_Park,_Home_of_The_African_Elephant_(51209270682).jpg"},
     "calc": "1 milliard de m³ × 0,5 g = 500 tonnes",
     "t": "Un cumulus contient environ un demi-gramme d’eau par mètre cube. Sur un kilomètre cube, cela fait 500 tonnes de gouttelettes : le poids d’une centaine d’éléphants de 5 tonnes. Le nuage flotte parce que l’air humide qui le forme est moins dense que l’air sec autour.",
     "links": [["USGS, le poids d’un nuage", "https://www.usgs.gov/special-topics/water-science-school/science/how-much-does-cloud-weigh"]]},
    {"h": "Ce que dit le Coran", "ar": "حَتَّىٰٓ إِذَآ أَقَلَّتۡ سَحَابٗا ثِقَالٗا", "key": "7:57",
     "t": "« Lorsqu’ils portent des nuages lourds » (7:57). Aqallat, c’est porter une charge, explique Ṭabarī, comme le chameau qui se relève avec son chargement. Thiqāl : lourds. Le vent porte, le nuage pèse.",
     "links": [["Tafsīr de Ṭabarī", "https://quran.com/7/57/tafsirs/ar-tafsir-al-tabari"]]},
  ],
}
