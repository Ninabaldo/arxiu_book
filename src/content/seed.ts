import type {
  ReflectionRecord,
  ReflectionTranslationRecord,
} from "@/types";

/**
 * Seed mirrors Supabase tables.
 * created_at / updated_at (and any editorial date) are internal only —
 * never rendered on the public book experience.
 */

export const reflectionRecords: ReflectionRecord[] = [
  {
    id: "1",
    slug: "la-vida-et-posa-a-prova",
    order: 1,
    type: "reflection",
    status: "published",
    image: "/chapters/01.jpg",
  },
  {
    id: "2",
    slug: "qui-et-vol-coneixer",
    order: 2,
    type: "reflection",
    status: "published",
    image: "/chapters/02.jpg",
  },
  {
    id: "3",
    slug: "tot-el-que-arriba",
    order: 3,
    type: "reflection",
    status: "published",
    image: "/chapters/03.jpg",
  },
  {
    id: "4",
    slug: "la-vida-esta-a-favor-teu",
    order: 4,
    type: "reflection",
    status: "published",
    image: "/chapters/04.jpg",
  },
  {
    id: "5",
    slug: "aprendre-a-estar-sol",
    order: 5,
    type: "reflection",
    status: "published",
    image: "/chapters/05.jpg",
  },
  {
    id: "6",
    slug: "deixar-anar",
    order: 6,
    type: "reflection",
    status: "published",
    image: "/chapters/06.jpg",
  },
  {
    id: "7",
    slug: "les-ulleres-dels-altres",
    order: 7,
    type: "reflection",
    status: "published",
    image: "/chapters/07.jpg",
  },
  {
    id: "8",
    slug: "ser-abans-que-fer",
    order: 8,
    type: "reflection",
    status: "published",
    image: "/chapters/08.jpg",
  },
  {
    id: "9",
    slug: "la-calma-ho-fa-tot-possible",
    order: 9,
    type: "reflection",
    status: "published",
    image: "/chapters/09.jpg",
  },
  {
    id: "10",
    slug: "lart-com-a-expressio-intencionada",
    order: 10,
    type: "reflection",
    status: "published",
    image: "/chapters/10.jpg",
  },
];

type TranslationSeed = {
  reflection_id: string;
  language: "ca" | "es" | "en" | "fr";
  title: string;
  content: string;
};

const translations: TranslationSeed[] = [
  // ─── 01 ───
  {
    reflection_id: "1",
    language: "ca",
    title: "La vida et posa a prova",
    content: `La vida et posa a prova constantment.

En el moment que dius que vols ser més pacient, més resilient o més fort, et posa davant de les pitjors situacions perquè aprenguis a ser-ho.

I un cop passes la prova, inconscientment et preguntes:

«Ostres, crec que ara sí que he guanyat paciència.»

Doncs la vida, l'Univers, t'escolta i et torna a posar a prova.

Amb petites coses que sap que podrien fer-te perdre la paciència.

Perquè sempre t'està observant.

Pren-t'ho com una prova i veuràs com la superes abans del que pensaves.`,
  },
  {
    reflection_id: "1",
    language: "es",
    title: "La vida te pone a prueba",
    content: `La vida te pone a prueba constantemente.

En el momento en que dices que quieres ser más paciente, más resiliente o más fuerte, te pone delante de las peores situaciones para que aprendas a serlo.

Y una vez pasas la prueba, inconscientemente te preguntas:

«Ostras, creo que ahora sí que he ganado paciencia.»

Pues la vida, el Universo, te escucha y vuelve a ponerte a prueba.

Con pequeñas cosas que sabe que podrían hacerte perder la paciencia.

Porque siempre te está observando.

Tómatelo como una prueba y verás cómo la superas antes de lo que pensabas.`,
  },
  {
    reflection_id: "1",
    language: "en",
    title: "Life puts you to the test",
    content: `Life puts you to the test constantly.

The moment you say you want to be more patient, more resilient or stronger, it places you in front of the hardest situations so you can learn to become that.

And once you pass the test, you unconsciously ask yourself:

«Wow, I think I’ve finally gained some patience.»

Then life — the Universe — hears you, and puts you to the test again.

With small things it knows could make you lose your patience.

Because it is always watching you.

Take it as a test, and you’ll see how you rise through it sooner than you thought.`,
  },
  {
    reflection_id: "1",
    language: "fr",
    title: "La vie te met à l’épreuve",
    content: `La vie te met à l’épreuve en permanence.

Au moment où tu dis que tu veux être plus patient, plus résilient ou plus fort, elle te place face aux pires situations pour que tu apprennes à le devenir.

Et une fois l’épreuve passée, tu te demandes inconsciemment :

« Tiens, je crois que j’ai enfin gagné en patience. »

Alors la vie, l’Univers, t’entend et te remet à l’épreuve.

Avec de petites choses dont elle sait qu’elles pourraient te faire perdre patience.

Parce qu’elle t’observe toujours.

Prends-le comme une épreuve, et tu verras que tu la surmontes plus tôt que tu ne le pensais.`,
  },

  // ─── 02 ───
  {
    reflection_id: "2",
    language: "ca",
    title: "Ni fugir, ni forçar-ho",
    content: `Si alguna cosa és per tu, et perseguirà encara que vulguis marxar.
Si algú et vol conèixer, et coneixerà.
Si algú vol estar amb tu, no marxarà.
Si algú t'estima, t'ho demostrarà.

Això no vol dir quedar-te quiet esperant. Vol dir posar-hi la teva part, sense necessitat de forçar la de l'altre.

Cal tenir en compte, però, que el llenguatge de l'amor és molt divers. No tots estimem ni el demostrem de la mateixa manera.

Però hi ha unes bases que podem compartir tots: un mínim d'interès, reciprocitat, iniciativa equilibrada, sentiment de pau, no trair-nos per complaure.

No has de perseguir allò que constantment has de convèncer perquè existeixi.

I si alguna cosa no és, no vol dir que no en puguis extreure res.
De fet, si no és, probablement és precisament perquè n'has d'aprendre alguna cosa, que ben apresa, et servirà per a la resta de la teva vida.`,
  },
  {
    reflection_id: "2",
    language: "es",
    title: "Ni huir, ni forzarlo",
    content: `Si algo es para ti, te perseguirá aunque quieras irte.
Si alguien te quiere conocer, te conocerá.
Si alguien quiere estar contigo, no se irá.
Si alguien te ama, te lo demostrará.

Eso no significa quedarte quieto esperando. Significa poner tu parte, sin necesidad de forzar la del otro.

Hay que tener en cuenta, sin embargo, que el lenguaje del amor es muy diverso. No todos amamos ni lo demostramos de la misma manera.

Pero hay unas bases que podemos compartir todos: un mínimo de interés, reciprocidad, iniciativa equilibrada, sentimiento de paz, no traicionarnos por complacer.

No tienes que perseguir aquello que constantemente has de convencer para que exista.

Y si algo no es, no significa que no puedas extraer nada de ello.
De hecho, si no es, probablemente es precisamente porque has de aprender algo que, bien aprendido, te servirá para el resto de tu vida.`,
  },
  {
    reflection_id: "2",
    language: "en",
    title: "Neither flee, nor force it",
    content: `If something is meant for you, it will pursue you even if you want to leave.
If someone wants to know you, they will know you.
If someone wants to be with you, they will not leave.
If someone loves you, they will show you.

That does not mean staying still and waiting. It means doing your part, without needing to force the other’s.

It matters, though, to remember that the language of love is deeply diverse. We do not all love or show it in the same way.

But there are a few foundations we can all share: a minimum of interest, reciprocity, a balanced initiative, a sense of peace, not betraying ourselves to please.

You do not have to chase what you constantly have to convince into existing.

And if something is not meant to be, that does not mean you cannot take something from it.
In fact, if it is not, it is probably precisely because there is something you need to learn — and once learned well, it will serve you for the rest of your life.`,
  },
  {
    reflection_id: "2",
    language: "fr",
    title: "Ni fuir, ni forcer",
    content: `Si quelque chose est pour toi, elle te poursuivra même si tu veux partir.
Si quelqu’un veut te connaître, il te connaîtra.
Si quelqu’un veut être avec toi, il ne partira pas.
Si quelqu’un t’aime, il te le montrera.

Cela ne veut pas dire rester immobile en attendant. Cela veut dire faire ta part, sans avoir besoin de forcer celle de l’autre.

Il faut toutefois garder à l’esprit que le langage de l’amour est très divers. Nous n’aimons pas tous, et nous ne le montrons pas tous, de la même manière.

Mais il existe des bases que nous pouvons tous partager : un minimum d’intérêt, de la réciprocité, une initiative équilibrée, un sentiment de paix, ne pas se trahir pour plaire.

Tu n’as pas à poursuivre ce que tu dois constamment convaincre d’exister.

Et si quelque chose n’est pas, cela ne veut pas dire que tu ne puisses rien en retirer.
En fait, s’il n’est pas, c’est probablement précisément parce que tu as quelque chose à en apprendre — qui, une fois bien appris, te servira pour le reste de ta vie.`,
  },

  // ─── 03 ───
  {
    reflection_id: "3",
    language: "ca",
    title: "No tot el que acaba és una pèrdua",
    content: `Totes les relacions que viurem al llarg de la nostra vida ens aporten un aprenentatge que pot ser immens.

Quedar-nos únicament amb el dolor d'una ruptura —i no em refereixo a no sentir-lo durant un temps, perquè això és imprescindible per transcendir-lo— és contraproduent.

Perquè, si només ens quedem amb el dolor, no arribem a entendre la importància del que aquella relació ens ha aportat.

La vida és cíclica.
Res és permanent i tot es mou constantment.

Les coses que es trenquen, les relacions que s'acaben, també ens obren portes a noves oportunitats que, sense elles, potser mai no s'haurien obert.

No tot el que perdura és bo.
I no tot el que acaba és una pèrdua.`,
  },
  {
    reflection_id: "3",
    language: "es",
    title: "No todo lo que termina es una pérdida",
    content: `Todas las relaciones que viviremos a lo largo de nuestra vida nos aportan un aprendizaje que puede ser inmenso.

Quedarnos únicamente con el dolor de una ruptura —y no me refiero a no sentirlo durante un tiempo, porque eso es imprescindible para trascenderlo— es contraproducente.

Porque, si solo nos quedamos con el dolor, no llegamos a entender la importancia de lo que aquella relación nos ha aportado.

La vida es cíclica.
Nada es permanente y todo se mueve constantemente.

Las cosas que se rompen, las relaciones que terminan, también nos abren puertas a nuevas oportunidades que, sin ellas, quizás nunca se habrían abierto.

No todo lo que perdura es bueno.
Y no todo lo que termina es una pérdida.`,
  },
  {
    reflection_id: "3",
    language: "en",
    title: "Not everything that ends is a loss",
    content: `Every relationship we live through in our lives brings us a learning that can be immense.

Staying only with the pain of a breakup — and I do not mean not feeling it for a while, because that is essential in order to transcend it — is counterproductive.

Because if we stay only with the pain, we do not come to understand the importance of what that relationship gave us.

Life is cyclical.
Nothing is permanent, and everything is constantly moving.

The things that break, the relationships that end, also open doors to new opportunities that, without them, might never have opened.

Not everything that lasts is good.
And not everything that ends is a loss.`,
  },
  {
    reflection_id: "3",
    language: "fr",
    title: "Tout ce qui se termine n’est pas une perte",
    content: `Toutes les relations que nous vivrons au cours de notre vie nous apportent un apprentissage qui peut être immense.

Rester uniquement avec la douleur d’une rupture — et je ne parle pas de ne pas la ressentir pendant un certain temps, car cela est indispensable pour la transcender — est contre-productif.

Parce que, si nous ne restons qu’avec la douleur, nous n’arrivons pas à comprendre l’importance de ce que cette relation nous a apporté.

La vie est cyclique.
Rien n’est permanent et tout bouge constamment.

Les choses qui se brisent, les relations qui se terminent, nous ouvrent aussi des portes vers de nouvelles opportunités qui, sans elles, ne se seraient peut-être jamais ouvertes.

Tout ce qui dure n’est pas forcément bon.
Et tout ce qui se termine n’est pas forcément une perte.`,
  },

  // ─── 04 ───
  {
    reflection_id: "4",
    language: "ca",
    title: "La vida està a favor teu",
    content: `Què ens aporta creure en alguna cosa? Tenir fe?

L'Univers, la vida, la força suprema, Déu... el nom que li posem importa poc.

Fe en què?

Per mi, la fe no comença deixant anar, creient que tot està en mans alienes i sense prendre cap tipus d'acció per part nostra. Comença posant-hi una intenció.

Primer cal saber cap a on vols anar. Tenir uns objectius, una direcció clara.
Després, creure-hi.
I només llavors, deixar anar el control. Confiar que no ho has de sostenir tot tu sol.

Jo crec que, sigui quin sigui el nom que hi donem, sempre està a favor nostre.
Ens guia cap al millor.
Perquè l'únic que vol és oferir-nos l'abundància infinita que pot donar.

I les pèrdues, els trencaments, també en formen part. No sempre és fàcil veure-ho enmig del dolor, però amb el temps es revelen com un pas més d'aquest camí.

Quan hi tens fe, ho comences a veure a tot arreu.

En les casualitats.
En les persones que apareixen.
En les portes que es tanquen.
En les que s'obren.
En allò que avui no entens i que, amb el temps, acaba tenint tot el sentit.`,
  },
  {
    reflection_id: "4",
    language: "es",
    title: "La vida está a tu favor",
    content: `¿Qué nos aporta creer en algo? ¿Tener fe?

El Universo, la vida, la fuerza suprema, Dios... el nombre que le pongamos importa poco.

¿Fe en qué?

Para mí, la fe no empieza soltando, creyendo que todo está en manos ajenas y sin tomar ningún tipo de acción por nuestra parte. Empieza poniendo una intención.

Primero hay que saber hacia dónde quieres ir. Tener unos objetivos, una dirección clara.
Después, creer en ello.
Y solo entonces, soltar el control. Confiar en que no lo tienes que sostener todo tú solo.

Yo creo que, sea cual sea el nombre que le demos, siempre está a favor nuestro.
Nos guía hacia lo mejor.
Porque lo único que quiere es ofrecernos la abundancia infinita que puede dar.

Y las pérdidas, las rupturas, también forman parte. No siempre es fácil verlo en medio del dolor, pero con el tiempo se revelan como un paso más de este camino.

Cuando tienes fe en ello, empiezas a verlo en todas partes.

En las casualidades.
En las personas que aparecen.
En las puertas que se cierran.
En las que se abren.
En aquello que hoy no entiendes y que, con el tiempo, acaba teniendo todo el sentido.`,
  },
  {
    reflection_id: "4",
    language: "en",
    title: "Life is on your side",
    content: `What does believing in something give us? Having faith?

The Universe, life, the supreme force, God… the name we give it matters little.

Faith in what?

For me, faith does not begin by letting go, believing that everything is in someone else’s hands and taking no action of our own. It begins by setting an intention.

First you need to know where you want to go. To have goals, a clear direction.
Then, to believe in it.
And only then, to release control. To trust that you do not have to hold it all alone.

I believe that, whatever name we give it, it is always on our side.
It guides us toward what is best.
Because all it wants is to offer us the infinite abundance it can give.

And losses, breakups, are part of it too. It is not always easy to see that in the middle of pain, but with time they reveal themselves as another step on this path.

When you have faith in it, you begin to see it everywhere.

In the coincidences.
In the people who appear.
In the doors that close.
In the ones that open.
In what you do not understand today, and that, with time, ends up making complete sense.`,
  },
  {
    reflection_id: "4",
    language: "fr",
    title: "La vie est de ton côté",
    content: `Qu’est-ce que croire en quelque chose nous apporte ? Avoir la foi ?

L’Univers, la vie, la force suprême, Dieu… le nom que nous lui donnons importe peu.

Foi en quoi ?

Pour moi, la foi ne commence pas en lâchant prise, en croyant que tout est entre des mains étrangères et sans prendre aucune action de notre part. Elle commence en y mettant une intention.

D’abord, il faut savoir où l’on veut aller. Avoir des objectifs, une direction claire.
Ensuite, y croire.
Et seulement alors, lâcher le contrôle. Faire confiance au fait que l’on n’a pas à tout porter seul.

Je crois que, quel que soit le nom que nous lui donnons, il est toujours de notre côté.
Il nous guide vers le meilleur.
Parce que la seule chose qu’il veut, c’est nous offrir l’abondance infinie qu’il peut donner.

Et les pertes, les ruptures, en font aussi partie. Il n’est pas toujours facile de le voir au milieu de la douleur, mais avec le temps elles se révèlent comme un pas de plus sur ce chemin.

Quand tu y as foi, tu commences à le voir partout.

Dans les coïncidences.
Dans les personnes qui apparaissent.
Dans les portes qui se ferment.
Dans celles qui s’ouvrent.
Dans ce que tu ne comprends pas aujourd’hui et qui, avec le temps, finit par avoir tout son sens.`,
  },

  // ─── 05 ───
  {
    reflection_id: "5",
    language: "ca",
    title: "La soledat acompanyada",
    content: `Quan la soledat crema, busquem desesperadament una via d'escapament.
Una solució.
Una sortida ràpida.

Perquè al principi, quan observem els nostres propis pensaments, tot és fosc i desordenat. Ens costa quedar-nos-hi.

I és precisament d'això que escapem: no de la soledat en si, sinó d'aquell soroll de dins que costa tant d'escoltar.

Però a mesura que hi tornem, amb presència, el desordre es va assentant.

Trobar aquest punt és una de les ocupacions més valuoses que hi ha.

Sentir-nos a gust amb nosaltres mateixos, en soledat, observant els nostres propis pensaments, és el que després ens permet sentir-nos a gust amb tothom.

Quan comencem a sentir-li gràcia a aquesta soledat —una que ja no necessita cobrir-se ni tapar-se amb distraccions— de cop deixa de sentir-se com a tal.`,
  },
  {
    reflection_id: "5",
    language: "es",
    title: "La soledad acompañada",
    content: `Cuando la soledad quema, buscamos desesperadamente una vía de escape.
Una solución.
Una salida rápida.

Porque al principio, cuando observamos nuestros propios pensamientos, todo es oscuro y desordenado. Nos cuesta quedarnos ahí.

Y es precisamente de eso de lo que escapamos: no de la soledad en sí, sino de aquel ruido interior que cuesta tanto escuchar.

Pero a medida que volvemos, con presencia, el desorden se va asentando.

Encontrar ese punto es una de las ocupaciones más valiosas que hay.

Sentirnos a gusto con nosotros mismos, en soledad, observando nuestros propios pensamientos, es lo que después nos permite sentirnos a gusto con todo el mundo.

Cuando empezamos a tomarle cariño a esta soledad —una que ya no necesita cubrirse ni taparse con distracciones— de golpe deja de sentirse como tal.`,
  },
  {
    reflection_id: "5",
    language: "en",
    title: "Accompanied solitude",
    content: `When solitude burns, we desperately look for a way out.
A solution.
A quick escape.

Because at first, when we observe our own thoughts, everything is dark and disordered. It is hard to stay with it.

And that is precisely what we are fleeing: not solitude itself, but that noise within that is so hard to listen to.

But as we return to it, with presence, the disorder begins to settle.

Finding that point is one of the most valuable occupations there is.

Feeling at ease with ourselves, in solitude, watching our own thoughts, is what later allows us to feel at ease with everyone.

When we begin to take pleasure in this solitude —one that no longer needs to cover or hide itself with distractions— suddenly it stops feeling like solitude at all.`,
  },
  {
    reflection_id: "5",
    language: "fr",
    title: "La solitude accompagnée",
    content: `Quand la solitude brûle, nous cherchons désespérément une voie d’échappement.
Une solution.
Une sortie rapide.

Parce qu’au début, quand nous observons nos propres pensées, tout est sombre et désordonné. Il nous est difficile d’y rester.

Et c’est précisément de cela que nous fuyons : non de la solitude en soi, mais de ce bruit intérieur si difficile à écouter.

Mais à mesure que nous y revenons, avec présence, le désordre s’apaise.

Trouver ce point est l’une des occupations les plus précieuses qui soient.

Se sentir bien avec soi-même, dans la solitude, en observant ses propres pensées, c’est ce qui nous permet ensuite de nous sentir bien avec tout le monde.

Quand nous commençons à goûter cette solitude —une qui n’a plus besoin de se couvrir ni de se cacher derrière des distractions— d’un coup elle cesse de se sentir comme telle.`,
  },

  // ─── 06 ───
  {
    reflection_id: "6",
    language: "ca",
    title: "Deixar anar",
    content: `No pots tenir allò que encara no tens.

Però si ho tinguessis, per a tu seria una normalitat.

Ja no ho voldries de la mateixa manera.

No hi pensaries constantment.

No t'hi obsessionaries.

Quan deixes de pensar-hi com una carència i comences a integrar-ho com alguna cosa que ja forma part de tu, alguna cosa canvia.

L'Univers es posa al teu favor.

I, inevitablement, acabes aconseguint-ho.`,
  },
  {
    reflection_id: "6",
    language: "es",
    title: "Dejar ir",
    content: `No puedes tener aquello que todavía no tienes.

Pero si lo tuvieras, para ti sería una normalidad.

Ya no lo querrías de la misma manera.

No pensarías en ello constantemente.

No te obsesionarías con ello.

Cuando dejas de pensarlo como una carencia y empiezas a integrarlo como algo que ya forma parte de ti, algo cambia.

El Universo se pone a tu favor.

Y, inevitablemente, acabas consiguiéndolo.`,
  },
  {
    reflection_id: "6",
    language: "en",
    title: "Letting go",
    content: `You cannot have what you do not yet have.

But if you already had it, it would feel ordinary to you.

You would no longer want it in the same way.

You would not think about it constantly.

You would not obsess over it.

When you stop thinking of it as a lack, and begin to integrate it as something that already belongs to you, something changes.

The Universe aligns in your favor.

And inevitably, you end up receiving it.`,
  },
  {
    reflection_id: "6",
    language: "fr",
    title: "Lâcher prise",
    content: `Tu ne peux pas avoir ce que tu n’as pas encore.

Mais si tu l’avais, cela serait pour toi une normalité.

Tu ne le voudrais plus de la même manière.

Tu n’y penserais pas constamment.

Tu ne t’y obsessionnerais pas.

Quand tu cesses d’y penser comme à un manque et que tu commences à l’intégrer comme quelque chose qui fait déjà partie de toi, quelque chose change.

L’Univers se met en ta faveur.

Et, inévitablement, tu finis par l’obtenir.`,
  },

  // ─── 07 ───
  {
    reflection_id: "7",
    language: "ca",
    title: "Les ulleres dels altres",
    content: `Preocupar-te pel que pensen els altres és inútil.

Cada individu té unes ulleres tintades amb la seva pròpia realitat, les seves vivències i les seves creences.

Per tant, la manera com algú et veu dependrà molt més d'ell que de com ets realment tu.

No pots controlar les ulleres dels altres.

Només pots decidir com vols mirar tu.`,
  },
  {
    reflection_id: "7",
    language: "es",
    title: "Las gafas de los demás",
    content: `Preocuparte por lo que piensan los demás es inútil.

Cada individuo tiene unas gafas teñidas con su propia realidad, sus vivencias y sus creencias.

Por tanto, la manera en que alguien te ve dependerá mucho más de él que de cómo eres realmente tú.

No puedes controlar las gafas de los demás.

Solo puedes decidir cómo quieres mirar tú.`,
  },
  {
    reflection_id: "7",
    language: "en",
    title: "Other people’s glasses",
    content: `Worrying about what other people think is useless.

Every person wears glasses tinted with their own reality, their experiences and their beliefs.

So the way someone sees you depends far more on them than on who you really are.

You cannot control other people’s glasses.

You can only decide how you want to look.`,
  },
  {
    reflection_id: "7",
    language: "fr",
    title: "Les lunettes des autres",
    content: `Te préoccuper de ce que pensent les autres est inutile.

Chaque individu porte des lunettes teintées de sa propre réalité, de ses expériences et de ses croyances.

Par conséquent, la façon dont quelqu’un te voit dépendra bien plus de lui que de ce que tu es réellement.

Tu ne peux pas contrôler les lunettes des autres.

Tu peux seulement décider comment tu veux regarder.`,
  },

  // ─── 08 ───
  {
    reflection_id: "8",
    language: "ca",
    title: "Ser abans que fer",
    content: `L'esforç físic pot ser el premi de consolació de qui encara no domina la seva ment.

Mentre el 99% s'esgota en el fer, l'1% domina el ser.

L'esforç sense alineació ens allunya de nosaltres mateixos.

Quan actuem des de la por, des de la necessitat o des de la desesperació, ens costa veure amb claredat.

Quan primer ordenem el nostre interior, alguna cosa canvia també en l'exterior.

No sempre cal fer més.

A vegades cal ser més.

I des d'aquest lloc, actuar.`,
  },
  {
    reflection_id: "8",
    language: "es",
    title: "Ser antes que hacer",
    content: `El esfuerzo físico puede ser el premio de consolación de quien todavía no domina su mente.

Mientras el 99% se agota en el hacer, el 1% domina el ser.

El esfuerzo sin alineación nos aleja de nosotros mismos.

Cuando actuamos desde el miedo, desde la necesidad o desde la desesperación, nos cuesta ver con claridad.

Cuando primero ordenamos nuestro interior, algo cambia también en el exterior.

No siempre hace falta hacer más.

A veces hace falta ser más.

Y desde ese lugar, actuar.`,
  },
  {
    reflection_id: "8",
    language: "en",
    title: "Being before doing",
    content: `Physical effort can be the consolation prize of those who have not yet mastered their mind.

While 99% exhaust themselves in doing, 1% master being.

Effort without alignment takes us away from ourselves.

When we act from fear, from need or from despair, it becomes hard to see clearly.

When we first put our inner world in order, something shifts in the outer world too.

It is not always necessary to do more.

Sometimes we need to be more.

And from that place, act.`,
  },
  {
    reflection_id: "8",
    language: "fr",
    title: "Être avant de faire",
    content: `L’effort physique peut être le prix de consolation de celui qui ne maîtrise pas encore son esprit.

Pendant que 99 % s’épuisent dans le faire, 1 % maîtrise l’être.

L’effort sans alignement nous éloigne de nous-mêmes.

Quand nous agissons depuis la peur, depuis le besoin ou depuis le désespoir, il nous est difficile de voir clairement.

Quand nous mettons d’abord de l’ordre en nous, quelque chose change aussi à l’extérieur.

Il n’est pas toujours nécessaire d’en faire plus.

Parfois, il faut être davantage.

Et depuis cet endroit, agir.`,
  },

  // ─── 09 ───
  {
    reflection_id: "9",
    language: "ca",
    title: "La calma ho fa tot possible",
    content: `Quan estem inspirats, tot flueix.
Les idees arriben soles. Les decisions es prenen quasi sense esforç. El temps gairebé desapareix.

Però el flux no apareix del no-res.

Per fluir, primer cal calma mental. Un espai net, sense soroll, on els pensaments no es trepitgen els uns als altres. I és en aquest silenci on la intuïció també es pot escoltar.

Crec que tots portem la creativitat a dins. Però moltes vegades queda amagada, tapada pel soroll del dia a dia, per les presses, per l'exigència.

No és que ens falti. És que no li hem fet lloc.

Quan trobem aquesta calma, la creativitat torna a sortir sola. I amb ella, torna el flux.`,
  },
  {
    reflection_id: "9",
    language: "es",
    title: "La calma lo hace todo posible",
    content: `Cuando estamos inspirados, todo fluye.
Las ideas llegan solas. Las decisiones se toman casi sin esfuerzo. El tiempo casi desaparece.

Pero el flujo no aparece de la nada.

Para fluir, primero hace falta calma mental. Un espacio limpio, sin ruido, donde los pensamientos no se pisan unos a otros. Y es en ese silencio donde la intuición también se puede escuchar.

Creo que todos llevamos la creatividad dentro. Pero muchas veces queda escondida, tapada por el ruido del día a día, por las prisas, por la exigencia.

No es que nos falte. Es que no le hemos hecho sitio.

Cuando encontramos esa calma, la creatividad vuelve a salir sola. Y con ella, vuelve el flujo.`,
  },
  {
    reflection_id: "9",
    language: "en",
    title: "Calm makes everything possible",
    content: `When we are inspired, everything flows.
Ideas arrive on their own. Decisions are made almost without effort. Time nearly disappears.

But flow does not appear out of nowhere.

To flow, you first need mental calm. A clear space, without noise, where thoughts do not tread on one another. And it is in that silence that intuition can also be heard.

I believe we all carry creativity within. But often it stays hidden, covered by the noise of daily life, by hurry, by demand.

It is not that we lack it. It is that we have not made room for it.

When we find that calm, creativity comes out again on its own. And with it, flow returns.`,
  },
  {
    reflection_id: "9",
    language: "fr",
    title: "Le calme rend tout possible",
    content: `Quand nous sommes inspirés, tout coule.
Les idées arrivent d’elles-mêmes. Les décisions se prennent presque sans effort. Le temps disparaît presque.

Mais le flux n’apparaît pas de nulle part.

Pour fluer, il faut d’abord un calme mental. Un espace net, sans bruit, où les pensées ne se marchent pas les unes sur les autres. Et c’est dans ce silence que l’intuition peut aussi s’écouter.

Je crois que nous portons tous la créativité en nous. Mais bien souvent elle reste cachée, couverte par le bruit du quotidien, par la précipitation, par l’exigence.

Ce n’est pas qu’il nous en manque. C’est que nous ne lui avons pas fait de place.

Quand nous trouvons ce calme, la créativité ressort d’elle-même. Et avec elle, le flux revient.`,
  },

  // ─── 10 ───
  {
    reflection_id: "10",
    language: "ca",
    title: "L'art com a expressió intencionada",
    content: `L'art és molt més que un quadre o una escultura. És una de les formes més pures que tenim per expressar-nos.

I és profundament subjectiu: una mateixa obra pot semblar preciosa a algú i no dir res a algú altre.

L'art que commou és el que aconsegueix fer sentir alguna cosa —una pintura, una música, algú que vesteix amb gust, o fins i tot una creació digital que aconsegueix plasmar una idea que abans només existia al cap.

Perquè, en el fons, l'art és això: agafar alguna cosa de dins i convertir-la en alguna cosa que els altres puguin percebre.

I això és molt potent.`,
  },
  {
    reflection_id: "10",
    language: "es",
    title: "El arte como expresión intencionada",
    content: `El arte es mucho más que un cuadro o una escultura. Es una de las formas más puras que tenemos para expresarnos.

Y es profundamente subjetivo: una misma obra puede parecer preciosa a alguien y no decir nada a otra persona.

El arte que conmueve es el que consigue hacer sentir algo —una pintura, una música, alguien que viste con gusto, o incluso una creación digital que consigue plasmar una idea que antes solo existía en la cabeza.

Porque, en el fondo, el arte es eso: coger algo de dentro y convertirlo en algo que los demás puedan percibir.

Y eso es muy potente.`,
  },
  {
    reflection_id: "10",
    language: "en",
    title: "Art as intentional expression",
    content: `Art is much more than a painting or a sculpture. It is one of the purest ways we have to express ourselves.

And it is deeply subjective: the same work can seem beautiful to someone and mean nothing to someone else.

Art that moves us is the art that manages to make us feel something — a painting, a piece of music, someone who dresses with taste, or even a digital creation that manages to capture an idea that before only existed in the mind.

Because, at heart, art is this: taking something from within and turning it into something others can perceive.

And that is very powerful.`,
  },
  {
    reflection_id: "10",
    language: "fr",
    title: "L’art comme expression intentionnelle",
    content: `L’art est bien plus qu’un tableau ou une sculpture. C’est l’une des formes les plus pures que nous ayons pour nous exprimer.

Et il est profondément subjectif : une même œuvre peut sembler précieuse à quelqu’un et ne rien dire à quelqu’un d’autre.

L’art qui émeut est celui qui parvient à faire ressentir quelque chose — une peinture, une musique, quelqu’un qui s’habille avec goût, ou même une création numérique qui réussit à donner forme à une idée qui n’existait auparavant que dans la tête.

Parce que, au fond, l’art c’est cela : prendre quelque chose de l’intérieur et le transformer en quelque chose que les autres puissent percevoir.

Et c’est très puissant.`,
  },
];

export const reflectionTranslations: ReflectionTranslationRecord[] =
  translations.map((row, index) => ({
    id: `tr-${index + 1}`,
    reflection_id: row.reflection_id,
    language: row.language,
    title: row.title,
    content: row.content,
  }));
