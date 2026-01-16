import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shuffle, CheckCircle2, XCircle, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

/**
 * ECRANUL 4 – DREPTURI SI RESPONSABILITATI (INTERACTIV)
 * - Alege aleator 1 caz din 5
 * - 3 pagini (1/2/3) in aceeasi componenta
 * - Intrebari cu raspunsuri (multiple choice)
 *
 * IMPORTANT:
 * - Poti completa usor textele pentru cazurile 1-4 in obiectul CASES.
 */

const NEXT_ROUTE = "/ecrancin"; // schimba aici ruta urmatoare daca ai alta (ex: "/ecranCinci")

/* ------------------------- helpers ------------------------- */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function uid() {
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

/* ------------------------- DATA: 5 cazuri ------------------------- */
/**
 * Fiecare caz are:
 * - title
 * - pages: [ { label, intro?, blocks: [text], questions:[{id, prompt, options, correct}] } ]
 */
const CASES = [
    {
        id: "caz1",
        title: "CAZUL 1 – Vandalism (model)",
        pages: [
            {
                label: "Pagina 1",
                intro: "SĂ AFLĂM, DIN START, MAI MULTE DESPRE CELE ÎNTÂMPLATE",
                blocks: [
                    { type: "text", content: "Luthera, Sorel, Timotei și Elysia, adolescenți în vârstă de " },

                    {
                        type: "inlineChoice",
                        id: "c1_age",
                        options: ["15 ani", "14 ani", "16 ani"],
                        correct: "15 ani"
                    },

                    { type: "text", content: ", sunt prieteni apropiați și petrec mult timp " },

                    {
                        type: "inlineChoice",
                        id: "c1_how",
                        options: ["împreună", "separat"],
                        correct: "împreună"
                    },

                    { type: "text", content: ". Într-o seară, într-un moment de nechibzuință, au decis să se implice în acțiuni " },

                    {
                        type: "inlineChoice",
                        id: "c1_actions",
                        options: ["de huliganism", "brutale"],
                        correct: "de huliganism"
                    },

                    { type: "text", content: ". Plimbându-se prin " },

                    {
                        type: "inlineChoice",
                        id: "c1_place",
                        options: ["oraș", "localitate"],
                        correct: "oraș"
                    },

                    { type: "text", content: ", au făcut alegerea greșită de a vandaliza o toaletă publică. Cu gesturi " },

                    {
                        type: "inlineChoice",
                        id: "c1_gestures",
                        options: ["violente", "agresive"],
                        correct: "violente"
                    },

                    { type: "text", content: ", au lovit ușa cu picioarele și cu bucăți de lemn. Apoi, după ce au pătruns în interior, au distrus " },

                    {
                        type: "inlineChoice",
                        id: "c1_destroyed",
                        options: ["mobilierul", "pereții"],
                        correct: "mobilierul"
                    },

                    { type: "text", content: ", inclusiv sistemul de închidere și cel de taxare." },

                    { type: "text", content: " Consecințele " },

                    {
                        type: "inlineChoice",
                        id: "c1_consequences",
                        options: ["acțiunilor", "faptelor"],
                        correct: "faptelor"
                    },

                    { type: "text", content: " lor nu au întârziat să apară. A doua zi proprietarul a descoperit " },

                    {
                        type: "inlineChoice",
                        id: "c1_found",
                        options: ["pagubele", "stricăciunile"],
                        correct: "pagubele"
                    },

                    { type: "text", content: " și a anunțat imediat " },

                    {
                        type: "inlineChoice",
                        id: "c1_called",
                        options: ["poliția", "secția de poliție"],
                        correct: "poliția"
                    },

                    { type: "text", content: "." }
                ]

                ,
                questions: [
                    {
                        id: "c1_q1",
                        prompt: "Ce faptă ilegală a fost comisă?",
                        correct: "Vandalism",
                        options: ["Vandalism", "Furt", "Jaf"]
                    }
                ]
            },
            {
                label: "Pagina 2",
                intro: "DREPTURI ÎNCĂLCATE",
                blocks: ["Completează cu drepturile care au fost afectate în acest caz."],
                questions: [
                    {
                        id: "c1_q2",
                        prompt: "Ce drept a fost încălcat?",
                        correct: "Dreptul la proprietate",
                        options: ["Dreptul la proprietate", "Dreptul la vot", "Dreptul la educație"]
                    },
                    {
                        id: "c1_q3",
                        prompt: "Ce drept a mai fost afectat?",
                        correct: "Dreptul la securitate și liniște publică",
                        options: [
                            "Dreptul la securitate și liniște publică",
                            "Dreptul la vacanță",
                            "Dreptul la internet"
                        ]
                    }
                ]
            },
            {
                label: "Pagina 3",
                intro: "RĂSPUNDERE ȘI PEDEPSE",
                blocks: ["Alege răspunsurile corecte conform situației din caz."],
                questions: [
                    {
                        id: "c1_q4",
                        prompt: "Este contravenție sau infracțiune?",
                        correct: "Infracțiune",
                        options: ["Infracțiune", "Contravenție"]
                    },
                    {
                        id: "c1_q5",
                        prompt: "Are vârsta răspunderii penale?",
                        correct: "DA",
                        options: ["DA", "NU"]
                    }
                ]
            }
        ]
    },

    {
        id: "caz2",
        title: "CAZUL 2 – Cruțime față de animale (model)",
        pages: [
            {
                label: "Pagina 1",
                intro: "SĂ AFLĂM, DIN START, MAI MULTE DESPRE CELE ÎNTÂMPLATE",
                blocks: [
                    { type: "text", content: "Oberon, în vârstă de " },

                    {
                        type: "inlineChoice",
                        id: "c2_age",
                        options: ["14 ani", "13 ani", "15 ani"],
                        correct: "14 ani"
                    },

                    { type: "text", content: ", a luat arma pneumatică a " },

                    {
                        type: "inlineChoice",
                        id: "c2_owner",
                        options: ["tatălui", "părintelui"],
                        correct: "tatălui"
                    },

                    { type: "text", content: " său. A sustras-o fără " },

                    {
                        type: "inlineChoice",
                        id: "c2_permission",
                        options: ["permisiune", "voie"],
                        correct: "permisiune"
                    },

                    { type: "text", content: ", dorind să se dea mare în fața " },

                    {
                        type: "inlineChoice",
                        id: "c2_audience",
                        options: ["colegilor", "prietenilor"],
                        correct: "colegilor"
                    },

                    { type: "text", content: ". În timp ce se plimba cu ei pe o alee, Oberon a decis să folosească arma și, din " },

                    {
                        type: "inlineChoice",
                        id: "c2_mistake",
                        options: ["greșeală", "joacă"],
                        correct: "greșeală"
                    },

                    { type: "text", content: ", a tras un foc asupra unei " },

                    {
                        type: "inlineChoice",
                        id: "c2_target",
                        options: ["pisici", "păsări"],
                        correct: "pisici"
                    },

                    { type: "text", content: ", rănind-o. " },

                    {
                        type: "inlineChoice",
                        id: "c2_who_near",
                        options: ["Polițiștii", "Trecătorii"],
                        correct: "Polițiștii"
                    },

                    { type: "text", content: " se aflau în apropiere. Ei au auzit " },

                    {
                        type: "inlineChoice",
                        id: "c2_sound",
                        options: ["zgomotul", "sunetul"],
                        correct: "zgomotul"
                    },

                    { type: "text", content: " împușcăturii și au intervenit imediat. Au găsit grupul de copii adunat în jurul pisicii și pe Oberon care, fiind " },

                    {
                        type: "inlineChoice",
                        id: "c2_state",
                        options: ["speriat", "dezorientat"],
                        correct: "speriat"
                    },

                    { type: "text", content: ", a aruncat arma. Polițiștii au interzis imediat accesul la locul incidentului și au pornit cercetările, " },

                    {
                        type: "inlineChoice",
                        id: "c2_action",
                        options: ["preluând", "ridicând"],
                        correct: "ridicând"
                    },

                    { type: "text", content: " arma. S-au asigurat că nicio persoană nu a fost " },

                    {
                        type: "inlineChoice",
                        id: "c2_injured",
                        options: ["rănită", "vătămată"],
                        correct: "rănită"
                    },

                    { type: "text", content: " și au anunțat Serviciul sanitar-veterinar, pentru a-i acorda ajutor medical pisicii. " },

                    {
                        type: "inlineChoice",
                        id: "c2_parents",
                        options: ["Părinții", "Bunicii"],
                        correct: "Părinții"
                    },

                    { type: "text", content: " copiilor au fost contactați imediat și s-au deplasat cu toții spre " },

                    {
                        type: "inlineChoice",
                        id: "c2_where",
                        options: ["sectorul de poliție", "școală"],
                        correct: "sectorul de poliție"
                    },

                    { type: "text", content: ", pentru a clarifica situația." }
                ]

                ,
                questions: [
                    {
                        id: "c2_q1",
                        prompt: "Ce faptă ilegală a fost comisă?",
                        correct: "Cruțime față de animale",
                        options: ["Cruțime față de animale", "Furt", "Vandalism"]
                    }
                ]
            },
            {
                label: "Pagina 2",
                intro: "DREPTURI ÎNCĂLCATE",
                blocks: ["Alege drepturile afectate."],
                questions: [
                    {
                        id: "c2_q2",
                        prompt: "Ce drept a fost încălcat?",
                        correct: "Dreptul la siguranță și protecție",
                        options: ["Dreptul la siguranță și protecție", "Dreptul la proprietate", "Dreptul la vot"]
                    }
                ]
            },
            {
                label: "Pagina 3",
                intro: "RĂSPUNDERE ȘI PEDEPSE",
                blocks: ["Alege răspunsul corect."],
                questions: [
                    {
                        id: "c2_q3",
                        prompt: "Este contravenție sau infracțiune?",
                        correct: "Infracțiune",
                        options: ["Infracțiune", "Contravenție"]
                    },
                    {
                        id: "c2_q4",
                        prompt: "Are vârsta răspunderii contravenționale?",
                        correct: "DA",
                        options: ["DA", "NU"]
                    },
                    {
                        id: "c2_q5",
                        prompt: "O pedeapsă posibilă este:",
                        correct: "Amendă",
                        options: ["Amendă", "Diplomă", "Scutire de teme"]
                    }
                ]
            }
        ]
    },

    {
        id: "caz3",
        title: "CAZUL 3 – Insultă / Ofensă (model)",
        pages: [
            {
                label: "Pagina 1",
                intro: "SĂ AFLĂM, DIN START, MAI MULTE DESPRE CELE ÎNTÂMPLATE",
                blocks: [
                    { type: "text", content: "Thorian, în vârstă de " },

                    {
                        type: "inlineChoice",
                        id: "c3_age",
                        options: ["16 ani", "17 ani", "18 ani"],
                        correct: "17 ani"
                    },

                    { type: "text", content: ", este elev în clasa a XII-a. Locuiește cu " },

                    {
                        type: "inlineChoice",
                        id: "c3_lives",
                        options: ["părinții", "bunici"],
                        correct: "părinții"
                    },

                    { type: "text", content: " și, în general, are rezultate bune la școală. Totuși, într-o zi, supărat din cauza unei note slabe, Thorian a rostit cuvinte " },

                    {
                        type: "inlineChoice",
                        id: "c3_words",
                        options: ["urâte", "jignitoare", "ofensatoare"],
                        correct: "ofensatoare"
                    },

                    { type: "text", content: " în fața colegilor și profesorilor. Aceste cuvinte au fost îndreptate către " },

                    {
                        type: "inlineChoice",
                        id: "c3_target",
                        options: ["profesoara sa", "colegii"],
                        correct: "profesoara sa"
                    },

                    { type: "text", content: ", cauzându-i un mare disconfort emoțional. Atmosfera din clasă a devenit " },

                    {
                        type: "inlineChoice",
                        id: "c3_atmosphere",
                        options: ["tensionată", "încordată", "apăsătoare"],
                        correct: "tensionată"
                    },

                    { type: "text", content: ". Profesoara, afectată de situație, a decis să-l informeze pe " },

                    {
                        type: "inlineChoice",
                        id: "c3_inform",
                        options: ["directorul școlii", "consilierul"],
                        correct: "directorul școlii"
                    },

                    { type: "text", content: ". Scopul acestei sesizări a fost pentru a-l " },

                    {
                        type: "inlineChoice",
                        id: "c3_goal",
                        options: ["înțelege", "ajuta"],
                        correct: "ajuta"
                    },

                    { type: "text", content: " pe băiat, având în vedere că atitudinea lui Thorian a fost percepută ca foarte agresivă și necaracteristică lui. Directorul urma să intervină pentru a " },

                    {
                        type: "inlineChoice",
                        id: "c3_solution",
                        options: ["soluționa problema", "găsi soluții"],
                        correct: "găsi soluții"
                    },

                    { type: "text", content: ", căutând o cale de a remedia situația și de a-i sprijini pe toți cei implicați." }
                ]

                ,
                questions: [
                    {
                        id: "c3_q1",
                        prompt: "Ce faptă ilegală a fost comisă?",
                        correct: "Insultă / ofensă",
                        options: ["Insultă / ofensă", "Jaf", "Vandalism"]
                    }
                ]
            },
            {
                label: "Pagina 2",
                intro: "DREPTURI ÎNCĂLCATE",
                blocks: ["Alege drepturile afectate."],
                questions: [
                    {
                        id: "c3_q2",
                        prompt: "Ce drept a fost afectat?",
                        correct: "Dreptul la demnitate și onoare",
                        options: ["Dreptul la demnitate și onoare", "Dreptul la proprietate", "Dreptul la vot"]
                    },
                    {
                        id: "c3_q3",
                        prompt: "Ce drept a mai fost afectat?",
                        correct: "Dreptul la un mediu școlar sigur și sănătos",
                        options: [
                            "Dreptul la un mediu școlar sigur și sănătos",
                            "Dreptul la vacanță",
                            "Dreptul la jocuri"
                        ]
                    }
                ]
            },
            {
                label: "Pagina 3",
                intro: "RĂSPUNDERE ȘI PEDEPSE",
                blocks: ["Alege răspunsurile corecte."],
                questions: [
                    {
                        id: "c3_q4",
                        prompt: "Este contravenție sau infracțiune?",
                        correct: "Contravenție",
                        options: ["Infracțiune", "Contravenție"]
                    },
                    {
                        id: "c3_q5",
                        prompt: "O pedeapsă posibilă este:",
                        correct: "Amendă",
                        options: ["Amendă", "Cadou", "Bonus la note"]
                    }
                ]
            }
        ]
    },

    {
        id: "caz4",
        title: "CAZUL 4 – Călătorie fără bilet (model)",
        pages: [
            {
                label: "Pagina 1",
                intro: "SĂ AFLĂM, DIN START, MAI MULTE DESPRE CELE ÎNTÂMPLATE",
                blocks: [
                    { type: "text", content: "Gaspar, în vârstă de " },

                    {
                        type: "inlineChoice",
                        id: "c4_age",
                        options: ["16 ani", "17 ani", "18 ani"],
                        correct: "17 ani"
                    },

                    { type: "text", content: ", a întârziat la autobuzul școlar și a fost nevoit să meargă la " },

                    {
                        type: "inlineChoice",
                        id: "c4_where",
                        options: ["gara auto", "autogară"],
                        correct: "gara auto"
                    },

                    { type: "text", content: " pentru a lua un alt mijloc de transport către liceu. În grabă, a urcat în autobuz fără să-și cumpere " },

                    {
                        type: "inlineChoice",
                        id: "c4_ticket",
                        options: ["bilet", "tichet"],
                        correct: "bilet"
                    },

                    { type: "text", content: ", sperând că va trece " },

                    {
                        type: "inlineChoice",
                        id: "c4_how",
                        options: ["neobservat", "rapid"],
                        correct: "neobservat"
                    },

                    { type: "text", content: " de către șofer, din cauza aglomerației. În timpul călătoriei, a fost oprit de " },

                    {
                        type: "inlineChoice",
                        id: "c4_who",
                        options: ["controlori", "șofer"],
                        correct: "controlori"
                    },

                    { type: "text", content: ", care au constatat că Gaspar călătorea fără bilet și l-au " },

                    {
                        type: "inlineChoice",
                        id: "c4_action",
                        options: ["amendat", "avertizat"],
                        correct: "amendat"
                    },

                    { type: "text", content: ". Gaspar a refuzat să " },

                    {
                        type: "inlineChoice",
                        id: "c4_refuse",
                        options: ["achite", "plătească"],
                        correct: "plătească"
                    },

                    { type: "text", content: " amenda și a avut un comportament " },

                    {
                        type: "inlineChoice",
                        id: "c4_behavior",
                        options: ["agresiv", "violent"],
                        correct: "agresiv"
                    },

                    { type: "text", content: " față de controlori. În cele din urmă, controlorul a anunțat " },

                    {
                        type: "inlineChoice",
                        id: "c4_called",
                        options: ["poliția", "părinții"],
                        correct: "poliția"
                    },

                    { type: "text", content: ", care a intervenit pentru a clarifica situația." }
                ]

                ,
                questions: [
                    {
                        id: "c4_q1",
                        prompt: "Ce faptă ilegală a fost comisă?",
                        correct: "Călătorie fără bilet",
                        options: ["Călătorie fără bilet", "Furt", "Jaf"]
                    }
                ]
            },
            {
                label: "Pagina 2",
                intro: "DREPTURI ÎNCĂLCATE",
                blocks: ["Alege drepturile afectate."],
                questions: [
                    {
                        id: "c4_q2",
                        prompt: "Ce obligație a fost încălcată?",
                        correct: "Respectarea regulilor în transport public",
                        options: [
                            "Respectarea regulilor în transport public",
                            "Respectarea regulilor la sport",
                            "Respectarea regulilor la jocuri"
                        ]
                    },
                    {
                        id: "c4_q3",
                        prompt: "Ce drept a fost afectat pentru ceilalți?",
                        correct: "Dreptul la un mediu sigur și civilizat",
                        options: [
                            "Dreptul la un mediu sigur și civilizat",
                            "Dreptul la teme puține",
                            "Dreptul la distracție"
                        ]
                    }
                ]
            },
            {
                label: "Pagina 3",
                intro: "RĂSPUNDERE ȘI PEDEPSE",
                blocks: ["Alege răspunsurile corecte."],
                questions: [
                    {
                        id: "c4_q4",
                        prompt: "Este contravenție sau infracțiune?",
                        correct: "Contravenție",
                        options: ["Infracțiune", "Contravenție"]
                    },
                    {
                        id: "c4_q5",
                        prompt: "O pedeapsă posibilă este:",
                        correct: "Amendă",
                        options: ["Amendă", "Diplomă", "Extra pauză"]
                    }
                ]
            }
        ]
    },

    {
        id: "caz5",
        title: "CAZUL 5 – Șantaj (din poza ta)",
        pages: [
            {
                label: "Pagina 1",
                intro: "SĂ AFLĂM, DIN START, MAI MULTE DESPRE CELE ÎNTÂMPLATE",
                blocks: [
                    { type: "text", content: "Cleo, în vârstă de " },

                    {
                        type: "inlineChoice",
                        id: "c5_cleo_age",
                        options: ["14 ani", "15 ani", "16 ani"],
                        correct: "15 ani"
                    },

                    { type: "text", content: ", a avut o conversație îndelungată pe o rețea de socializare cu Titus, care are " },

                    {
                        type: "inlineChoice",
                        id: "c5_titus_age",
                        options: ["15 ani", "16 ani", "17 ani"],
                        correct: "16 ani"
                    },

                    { type: "text", content: ". În timpul unei astfel de discuții, Titus i-a cerut lui Cleo să îi trimită " },

                    {
                        type: "inlineChoice",
                        id: "c5_images",
                        options: ["imagini", "poze", "fotografii"],
                        correct: "poze"
                    },

                    { type: "text", content: " personale, în care să fie îmbrăcată provocator, pentru a-și face o părere despre cât de atrăgătoare este. Cleo, crezând că acest gest va fi apreciat și având sentimente de " },

                    {
                        type: "inlineChoice",
                        id: "c5_feelings",
                        options: ["simpatie", "dragoste", "iubire"],
                        correct: "simpatie"
                    },

                    { type: "text", content: " față de Titus, i-a trimis pozele solicitate." },

                    { type: "text", content: " Ulterior, când s-au " },

                    {
                        type: "inlineChoice",
                        id: "c5_breakup",
                        options: ["despărțit", "certat"],
                        correct: "despărțit"
                    },

                    { type: "text", content: ", Titus, pentru a se răzbuna, a arătat pozele " },

                    {
                        type: "inlineChoice",
                        id: "c5_to_whom",
                        options: ["prietenilor", "amicilor", "colegilor"],
                        correct: "prietenilor"
                    },

                    { type: "text", content: " săi. Ei au început să o " },

                    {
                        type: "inlineChoice",
                        id: "c5_action",
                        options: ["șantajeze", "amenințe"],
                        correct: "șantajeze"
                    },

                    { type: "text", content: " pe Cleo cu aceste imagini. Situația a devenit insuportabilă pentru fată și, în cele din urmă, a povestit totul " },

                    {
                        type: "inlineChoice",
                        id: "c5_parents",
                        options: ["părinților săi", "mamei", "tatălui"],
                        correct: "părinților săi"
                    },

                    { type: "text", content: ". Aceștia au luat imediat măsuri și au anunțat " },

                    {
                        type: "inlineChoice",
                        id: "c5_called",
                        options: ["poliția", "secția de poliție", "112"],
                        correct: "poliția"
                    },

                    { type: "text", content: ", solicitând ajutor pentru a o proteja pe fiica lor." }
                ]

                ,
                questions: [
                    {
                        id: "c5_q1",
                        prompt: "Ce faptă ilegală a comis?",
                        correct: "Șantaj",
                        options: ["Șantaj", "Vandalism", "Călătorie fără bilet"]
                    },
                    {
                        id: "c5_q2",
                        prompt: "Definiție: Șantajul este atunci când cineva folosește ____ sau ____ pentru a constrânge o persoană.",
                        correct: "violența / amenințările",
                        options: ["violența / amenințările", "glume / prietenie", "note / diplome"]
                    }
                ]
            },
            {
                label: "Pagina 2",
                intro: "DREPTURI ÎNCĂLCATE",
                blocks: [
                    "Alege drepturile care nu au fost respectate sau au fost limitate în acest caz."
                ],
                questions: [
                    {
                        id: "c5_q3",
                        prompt: "Ce drept a fost afectat?",
                        correct: "Dreptul la intimitate și confidențialitate",
                        options: [
                            "Dreptul la intimitate și confidențialitate",
                            "Dreptul la proprietate",
                            "Dreptul la vot"
                        ]
                    },
                    {
                        id: "c5_q4",
                        prompt: "Ce drept a mai fost afectat?",
                        correct: "Dreptul la imagine și demnitate",
                        options: [
                            "Dreptul la imagine și demnitate",
                            "Dreptul la vacanță",
                            "Dreptul la jocuri"
                        ]
                    },
                    {
                        id: "c5_q5",
                        prompt: "Ce drept a mai fost afectat?",
                        correct: "Dreptul la securitate personală",
                        options: ["Dreptul la securitate personală", "Dreptul la trafic", "Dreptul la sport"]
                    }
                ]
            },
            {
                label: "Pagina 3",
                intro: "RĂSPUNDERE ȘI PEDEPSE",
                blocks: [
                    "Alege răspunsurile corecte conform cazului."
                ],
                questions: [
                    {
                        id: "c5_q6",
                        prompt: "Este contravenție sau infracțiune?",
                        correct: "Infracțiune",
                        options: ["Infracțiune", "Contravenție"]
                    },
                    {
                        id: "c5_q7",
                        prompt: "Are vârsta răspunderii penale?",
                        correct: "DA",
                        options: ["DA", "NU"]
                    },
                    {
                        id: "c5_q8",
                        prompt: "O pedeapsă posibilă este:",
                        correct: "Închisoare",
                        options: ["Amendă", "Închisoare", "Permisiune specială"]
                    }
                ]
            }
        ]
    }
];

/* ------------------------- COMPONENT ------------------------- */
const EcranPatru = () => {
    const navigate = useNavigate();

    // pick random case only once per mount
    const pickedCase = useMemo(() => pickRandom(CASES), []);
    const [pageIndex, setPageIndex] = useState(0);

    // selections: { [questionId]: selectedOption }
    const [answers, setAnswers] = useState({});
    const [checked, setChecked] = useState(false);

    // shuffle options per question (stable)
    const shuffledOptions = useMemo(() => {
        const map = {};
        pickedCase.pages.forEach((p) => {
            p.questions.forEach((q) => {
                map[q.id] = shuffle(q.options);
            });
        });
        return map;
    }, [pickedCase]);

    // reset "checked" when page changes
    useEffect(() => {
        setChecked(false);
    }, [pageIndex]);

    const page = pickedCase.pages[pageIndex];
    const totalPages = pickedCase.pages.length;
    const inlineChoices =
        page.blocks?.filter(b => b.type === "inlineChoice") || [];

    const setAnswer = (qid, opt) => {
        setAnswers((prev) => ({ ...prev, [qid]: opt }));
    };

    const isPageComplete =
        page.questions.every(q => answers[q.id]) &&
        inlineChoices.every(b => answers[b.id]);


    const isPageAllCorrect = page.questions.every((q) => {
        const a = answers[q.id];
        if (!a) return false;
        return a === q.correct;
    });

    const goNext = () => {
        if (pageIndex < totalPages - 1) setPageIndex((p) => p + 1);
        else navigate(NEXT_ROUTE);
    };

    const goBack = () => {
        if (pageIndex > 0) setPageIndex((p) => p - 1);
    };

    const restartRandom = () => {
        // easiest: reload page to re-pick random case
        window.location.reload();
    };

    return (
        <div
            className="min-h-screen p-8 md:p-20 font-sans text-[#0F044C]"
            style={{ background: "linear-gradient(135deg, #EEEEEE 0%, #e2e8f0 100%)" }}
        >
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <header className="mb-10 md:mb-14">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3" style={{ color: "#0F044C" }}>
                                Ecranul 4 – Drepturi & Responsabilități
                            </h2>
                            <p className="text-[#787A91] text-lg md:text-xl max-w-3xl leading-relaxed">
                                Completează cazul ales aleator, apoi răspunde la întrebări pe 3 pagini.
                            </p>
                        </div>

                        <button
                            onClick={restartRandom}
                            className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/80 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                         hover:shadow-[0_18px_40px_rgba(20,30,97,0.12)] transition-all duration-300 active:scale-95"
                            title="Alege alt caz"
                        >
                            <Shuffle size={18} />
                            <span className="font-bold uppercase text-xs tracking-[0.25em] text-[#0F044C]">
                Alt caz (random)
              </span>
                        </button>
                    </div>

                    {/* CASE TITLE */}
                    <div className="mt-10 p-8 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 text-[#141E61]">
                                    <BookOpen size={18} />
                                    <span className="uppercase text-xs font-bold tracking-[0.3em]">Caz ales aleator</span>
                                </div>
                                <h3 className="mt-3 text-2xl md:text-3xl font-black tracking-tight text-[#0F044C]">
                                    {pickedCase.title}
                                </h3>
                                <p className="mt-3 text-[#787A91] leading-relaxed">
                                    {page.intro}
                                </p>
                            </div>

                            {/* PAGE PILLS */}
                            <div className="hidden md:flex gap-2">
                                {pickedCase.pages.map((p, i) => (
                                    <button
                                        key={p.label}
                                        onClick={() => setPageIndex(i)}
                                        className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300
                      ${i === pageIndex ? "bg-[#0F044C] text-[#EEEEEE] shadow-[0_10px_30px_rgba(15,4,76,0.25)]" : "bg-white/70 text-[#0F044C] hover:bg-white"}`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* MOBILE PAGE INDICATOR */}
                        <div className="md:hidden mt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#787A91]">
                {page.label} / {totalPages}
              </span>
                            <div className="flex gap-2">
                                {pickedCase.pages.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2 w-2 rounded-full ${i === pageIndex ? "bg-[#0F044C]" : "bg-[#0F044C]/20"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT: blocks + questions */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
                    {/* LEFT: TEXT */}
                    <div
                        className={`
    p-8 md:p-10 rounded-[2rem] bg-white/80 backdrop-blur-sm 
    border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)]
    ${pageIndex > 0 ? "h-1/4" : ""}
  `}
                    >
                        <h4 className="text-lg font-black tracking-tight text-[#0F044C] mb-6">
                            {page.label}
                        </h4>

                        <div className="space-y-5 text-[#0F044C] leading-relaxed">
                            <div className="text-[#0F044C]/90 text-lg leading-relaxed flex flex-wrap">
                                {page.blocks.map((block, i) => {
                                    if (typeof block === "string") {
                                        return <span key={i}>{block} </span>;
                                    }

                                    if (block.type === "text") {
                                        return <span key={i}>{block.content}</span>;
                                    }


                                    if (block.type === "inlineChoice") {
                                        const selected = answers[block.id];
                                        const isCorrect = selected === block.correct;

                                        return (
                                            <span key={block.id} className="mx-1 inline-flex gap-1">
          {block.options.map(opt => (
              <button
                  key={opt}
                  onClick={() =>
                      setAnswers(prev => ({ ...prev, [block.id]: opt }))
                  }
                  className={`px-2 py-1 rounded-full text-sm border transition
                ${
                      selected === opt
                          ? "bg-[#0F044C] text-white border-[#0F044C]"
                          : "bg-white border-[#787A91]/40 hover:bg-[#0F044C]/10"
                  }
                ${checked && selected === opt && !isCorrect ? "ring-2 ring-rose-400" : ""}
                ${checked && selected === opt && isCorrect ? "ring-2 ring-emerald-400" : ""}
              `}
              >
                  {opt}
              </button>
          ))}
        </span>
                                        );
                                    }

                                    return null;
                                })}
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: QUIZ */}
                    <div className="p-8 md:p-10 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div>
                                <p className="uppercase text-xs font-bold tracking-[0.3em] text-[#787A91]">
                                    Activitate
                                </p>
                                <h4 className="text-xl font-black tracking-tight text-[#0F044C]">
                                    Completează cu răspunsul corect
                                </h4>
                            </div>

                            <div
                                className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em]
                  ${checked ? (isPageAllCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-[#141E6110] text-[#0F044C]"}`}
                            >
                                {checked ? (isPageAllCorrect ? "CORECT" : "MAI ÎNCEARCĂ") : "NEVERIFICAT"}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {page.questions.map((q) => {
                                const selected = answers[q.id];
                                const isCorrect = selected === q.correct;

                                return (
                                    <div key={q.id} className="space-y-4">
                                        <p className="font-black text-[#0F044C]">
                                            {q.prompt}
                                        </p>

                                        <div className="grid grid-cols-1 gap-3">
                                            {shuffledOptions[q.id].map((opt) => {
                                                const active = selected === opt;
                                                const showState = checked && active;

                                                return (
                                                    <button
                                                        key={uid() + opt}
                                                        onClick={() => setAnswer(q.id, opt)}
                                                        className={`text-left w-full px-5 py-4 rounded-2xl border transition-all duration-300 active:scale-[0.99]
                              ${active
                                                            ? "bg-[#0F044C] text-[#EEEEEE] border-[#0F044C] shadow-[0_12px_35px_rgba(15,4,76,0.25)]"
                                                            : "bg-white/70 text-[#0F044C] border-white hover:bg-white hover:shadow-[0_18px_40px_rgba(20,30,97,0.10)]"
                                                        }
                              ${showState ? (isCorrect ? "ring-2 ring-emerald-400" : "ring-2 ring-rose-400") : ""}
                            `}
                                                    >
                                                        <div className="flex items-center justify-between gap-4">
                                                            <span className="font-semibold">{opt}</span>
                                                            {checked && active && (
                                                                isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {checked && selected && !isCorrect && (
                                            <p className="text-sm text-rose-700">
                                                Răspuns corect: <span className="font-bold">{q.correct}</span>
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-10 flex flex-col gap-3">
                            <button
                                onClick={() => setChecked(true)}
                                disabled={!isPageComplete}
                                className={`group relative overflow-hidden px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.3em] transition-all duration-300 active:scale-95
                  ${isPageComplete
                                    ? "bg-[#0F044C] text-[#EEEEEE] hover:shadow-[0_10px_30px_rgba(15,4,76,0.3)]"
                                    : "bg-[#0F044C]/20 text-[#0F044C]/40 cursor-not-allowed"
                                }`}
                            >
                                Verifică pagina
                                {isPageComplete && (
                                    <div className="absolute inset-0 bg-[#141E61] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                )}
                                <span className="relative z-10 block" />
                            </button>

                            <div className="flex items-center justify-between gap-3">
                                <button
                                    onClick={goBack}
                                    disabled={pageIndex === 0}
                                    className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.25em] transition-all duration-300 active:scale-95
                    ${pageIndex === 0 ? "bg-[#0F044C]/10 text-[#0F044C]/30 cursor-not-allowed" : "bg-white/80 text-[#0F044C] hover:bg-white hover:shadow-[0_12px_30px_rgba(20,30,97,0.12)]"}`}
                                >
                                    <ArrowLeft size={16} />
                                    Înapoi
                                </button>

                                <button
                                    onClick={goNext}
                                    disabled={!checked || !isPageAllCorrect}
                                    className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.25em] transition-all duration-300 active:scale-95
                    ${checked && isPageAllCorrect
                                        ? "bg-[#0F044C] text-[#EEEEEE] hover:shadow-[0_12px_30px_rgba(15,4,76,0.25)]"
                                        : "bg-[#0F044C]/10 text-[#0F044C]/30 cursor-not-allowed"
                                    }`}
                                >
                                    {pageIndex === totalPages - 1 ? "Final" : "Următorul"}
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <p className="text-xs text-[#787A91] leading-relaxed mt-2">
                                Ca să mergi mai departe: completează toate răspunsurile, apasă „Verifică pagina”, apoi trebuie să fie toate corecte.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-14 flex justify-center">
                    <div className="px-8 py-5 rounded-[2rem] bg-white/70 border border-white text-[#787A91] text-sm">
                        Cazul se alege aleator. Pentru a-l schimba, apasă „Alt caz (random)”.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcranPatru;
