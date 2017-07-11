# video-stats
Web page which reproduces video loaded synchronized with the statistics of the pilot.

TODO:

1) Seleziona anno -> var anno;
2) Ajax url("http://www.motogp.com/en/ajax/results/selector/" + anno)
3) Diplaya il JSON contenente le piste.
4) Seleziona pista -> var pista;
5) Ajax url("http://www.motogp.com/en/ajax/results/selector/" + anno +
                                                          "/" + pista)
6) Diplaya il JSON contenente le categorie.
7) Seleziona categoria -> var categoria;
8) Ajax url("http://www.motogp.com/en/ajax/results/selector/" + anno +
                                                          "/" + pista +
                                                          "/" + categoria)
9) Diplaya il JSON contenente le sessioni.
10) Seleziona sessione -> var sessione;
11) Ajax url("http://www.motogp.com/en/ajax/results/selector/" + anno +
                                                           "/" + pista +
                                                           "/" + categoria +
                                                           "/" + sessione +
                                                           "/" + "Session.pdf")
12) Elabora pdf.

NB SOLO DAL 2014 IN POI CI SONO LE SESSION DI TUTTE LE GARE.
