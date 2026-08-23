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
    slug: "fins-que-ho-aprenem",
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
  {
    id: "11",
    slug: "la-part-de-tu-que-ja-no-existeix",
    order: 11,
    type: "reflection",
    status: "published",
    image: "/chapters/11.jpg",
  },
  {
    id: "12",
    slug: "lexit",
    order: 12,
    type: "reflection",
    status: "published",
    image: "/chapters/12.jpg",
  },
  {
    id: "13",
    slug: "decisions",
    order: 13,
    type: "reflection",
    status: "published",
    image: "/chapters/13.jpg",
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
    title: "Fins que ho aprenem",
    content: `Hi ha situacions que sembla que es repeteixin a la nostra vida.

Canvien les persones, els llocs i les circumstàncies, però d'alguna manera acabem trobant-nos una vegada i una altra davant del mateix punt: la mateixa por, el mateix límit que no sabem posar, la mateixa necessitat de controlar, la mateixa dificultat per deixar anar, la mateixa manera de reaccionar.

I potser no és casualitat.

Potser hi ha coses que la vida ens continua mostrant perquè encara no les hem acabat d'aprendre.

A vegades pensem que ja ho hem superat perquè, davant d'una situació concreta, reaccionem diferent. Tenim més paciència. Posem un límit. No contestem. No insistim. Deixem anar.

I pensem: aquesta vegada sí.

Però més endavant torna a aparèixer una situació que, encara que sigui completament diferent, toca exactament el mateix lloc dins nostre.

I llavors entenem que no es tractava d'aquella situació.

Es tractava de nosaltres.

Potser la vida no ens repeteix les mateixes experiències perquè no hàgim après prou, sinó perquè encara hi ha una part de nosaltres que necessita ser mirada d'una altra manera.

Perquè aprendre alguna cosa no és saber què hauríem de fer.

És arribar a un punt en què ja no necessitem esforçar-nos per actuar diferent.

Simplement, un dia, ho fem.

I allò que abans es repetia deixa de tenir el mateix poder sobre nosaltres.`,
  },
  {
    reflection_id: "1",
    language: "es",
    title: "Hasta que lo aprendemos",
    content: `Hay situaciones que parece que se repiten en nuestra vida.

Cambian las personas, los lugares y las circunstancias, pero de alguna manera acabamos encontrándonos una y otra vez ante el mismo punto: el mismo miedo, el mismo límite que no sabemos poner, la misma necesidad de controlar, la misma dificultad para soltar, la misma manera de reaccionar.

Y quizá no es casualidad.

Quizá hay cosas que la vida nos sigue mostrando porque todavía no las hemos terminado de aprender.

A veces pensamos que ya lo hemos superado porque, ante una situación concreta, reaccionamos distinto. Tenemos más paciencia. Ponemos un límite. No contestamos. No insistimos. Soltamos.

Y pensamos: esta vez sí.

Pero más adelante vuelve a aparecer una situación que, aunque sea completamente distinta, toca exactamente el mismo lugar dentro de nosotros.

Y entonces entendemos que no se trataba de aquella situación.

Se trataba de nosotros.

Quizá la vida no nos repite las mismas experiencias porque no hayamos aprendido lo suficiente, sino porque todavía hay una parte de nosotros que necesita ser mirada de otra manera.

Porque aprender algo no es saber qué deberíamos hacer.

Es llegar a un punto en el que ya no necesitamos esforzarnos por actuar distinto.

Simplemente, un día, lo hacemos.

Y aquello que antes se repetía deja de tener el mismo poder sobre nosotros.`,
  },
  {
    reflection_id: "1",
    language: "en",
    title: "Until we learn it",
    content: `There are situations that seem to repeat themselves in our lives.

People, places and circumstances change, but somehow we end up finding ourselves again and again at the same point: the same fear, the same boundary we cannot set, the same need to control, the same difficulty letting go, the same way of reacting.

And maybe it is not a coincidence.

Maybe there are things life keeps showing us because we have not finished learning them yet.

Sometimes we think we have already moved past it because, in one particular situation, we react differently. We have more patience. We set a boundary. We do not answer back. We do not insist. We let go.

And we think: this time, yes.

But later another situation appears that, even if it is completely different, touches exactly the same place inside us.

And then we understand it was never about that situation.

It was about us.

Maybe life does not repeat the same experiences because we have not learned enough, but because there is still a part of us that needs to be looked at differently.

Because learning something is not knowing what we should do.

It is reaching a point where we no longer need to force ourselves to act differently.

One day, we simply do.

And what used to repeat itself no longer holds the same power over us.`,
  },
  {
    reflection_id: "1",
    language: "fr",
    title: "Jusqu’à ce qu’on l’apprenne",
    content: `Il y a des situations qui semblent se répéter dans notre vie.

Les personnes, les lieux et les circonstances changent, mais d’une certaine façon nous nous retrouvons encore et encore devant le même point : la même peur, la même limite que nous ne savons pas poser, le même besoin de contrôler, la même difficulté à lâcher prise, la même manière de réagir.

Et ce n’est peut-être pas un hasard.

Peut-être y a-t-il des choses que la vie continue de nous montrer parce que nous n’avons pas encore fini de les apprendre.

Parfois, nous pensons avoir déjà dépassé cela parce que, face à une situation précise, nous réagissons autrement. Nous avons plus de patience. Nous posons une limite. Nous ne répondons pas. Nous n’insistons pas. Nous lâchons prise.

Et nous pensons : cette fois, oui.

Mais plus tard réapparaît une situation qui, même si elle est complètement différente, touche exactement le même endroit en nous.

Et alors nous comprenons que ce n’était pas cette situation.

C’était nous.

Peut-être que la vie ne nous répète pas les mêmes expériences parce que nous n’avons pas assez appris, mais parce qu’il y a encore une part de nous qui a besoin d’être regardée autrement.

Parce qu’apprendre quelque chose, ce n’est pas savoir ce que nous devrions faire.

C’est arriver à un point où nous n’avons plus besoin de nous forcer à agir autrement.

Un jour, simplement, nous le faisons.

Et ce qui se répétait auparavant cesse d’avoir le même pouvoir sur nous.`,
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
    content: `No pots viure com si ja tinguessis allò que encara no tens.

Però imagina que ho tinguessis. Probablement, per a tu, seria una normalitat.

Ja no hi pensaries constantment. No ho buscaries a tot arreu. No t'hi obsessionaries.

I potser aquí hi ha una cosa interessant: quan deixes de viure allò que vols com una carència i comences a imaginar com seria si això que anheles formés part de la teva vida, alguna cosa canvia.

No perquè de sobte l'Univers t'ho hagi de posar davant, sinó perquè tu també comences a actuar d'una altra manera i a observar detalls que abans no observaves.

Potser deixes de perseguir-ho. Potser prens decisions diferents. Potser deixes espai perquè arribi.

I, sense adonar-te'n, deixes d'estar tan pendent d'aconseguir-ho i, d'alguna manera, acaba presentant-se a la teva vida.`,
  },
  {
    reflection_id: "6",
    language: "es",
    title: "Dejar ir",
    content: `No puedes vivir como si ya tuvieras aquello que todavía no tienes.

Pero imagina que lo tuvieras. Probablemente, para ti, sería una normalidad.

Ya no pensarías en ello constantemente. No lo buscarías en todas partes. No te obsesionarías con ello.

Y quizá aquí hay algo interesante: cuando dejas de vivir lo que quieres como una carencia y empiezas a imaginar cómo sería si eso que anhelas formara parte de tu vida, algo cambia.

No porque de pronto el Universo te lo tenga que poner delante, sino porque tú también empiezas a actuar de otra manera y a observar detalles que antes no observabas.

Quizá dejas de perseguirlo. Quizá tomas decisiones distintas. Quizá dejas espacio para que llegue.

Y, sin darte cuenta, dejas de estar tan pendiente de conseguirlo y, de alguna manera, acaba presentándose en tu vida.`,
  },
  {
    reflection_id: "6",
    language: "en",
    title: "Letting go",
    content: `You cannot live as if you already had what you do not yet have.

But imagine that you did. For you, it would probably feel ordinary.

You would no longer think about it constantly. You would not look for it everywhere. You would not obsess over it.

And maybe there is something interesting here: when you stop living what you want as a lack and begin to imagine what it would be like if what you long for were part of your life, something changes.

Not because the Universe suddenly has to place it in front of you, but because you also start acting differently and noticing details you did not notice before.

Maybe you stop chasing it. Maybe you make different decisions. Maybe you leave space for it to arrive.

And without noticing, you stop watching so closely for it — and somehow, it ends up showing up in your life.`,
  },
  {
    reflection_id: "6",
    language: "fr",
    title: "Lâcher prise",
    content: `Tu ne peux pas vivre comme si tu avais déjà ce que tu n’as pas encore.

Mais imagine que tu l’aies. Pour toi, ce serait probablement une normalité.

Tu n’y penserais plus constamment. Tu ne le chercherais pas partout. Tu ne t’y obsessionnerais pas.

Et peut-être y a-t-il ici quelque chose d’intéressant : quand tu cesses de vivre ce que tu veux comme un manque et que tu commences à imaginer ce que ce serait si ce que tu désires faisait partie de ta vie, quelque chose change.

Non pas parce que l’Univers doive soudain te le mettre devant, mais parce que toi aussi tu commences à agir autrement et à observer des détails que tu n’observais pas avant.

Peut-être que tu arrêtes de le poursuivre. Peut-être que tu prends des décisions différentes. Peut-être que tu laisses de l’espace pour que cela arrive.

Et, sans t’en rendre compte, tu cesses d’être aussi attaché à l’obtenir — et, d’une certaine manière, cela finit par se présenter dans ta vie.`,
  },

  // ─── 07 ───
  {
    reflection_id: "7",
    language: "ca",
    title: "Les ulleres dels altres",
    content: `Preocupar-te pel que pensen els altres és inútil.

Cada persona mira el món a través d'unes ulleres tintades amb la seva pròpia realitat: les seves vivències, les seves creences, les seves pors i tot allò que ha viscut.

Per això, la manera com algú et veu diu més d'ell que de tu.

Tu no pots controlar les ulleres amb què et miren els altres.

Només pots decidir si vols passar la vida intentant canviar-les o començar a mirar-te amb les teves.`,
  },
  {
    reflection_id: "7",
    language: "es",
    title: "Las gafas de los demás",
    content: `Preocuparte por lo que piensan los demás es inútil.

Cada persona mira el mundo a través de unas gafas teñidas con su propia realidad: sus vivencias, sus creencias, sus miedos y todo aquello que ha vivido.

Por eso, la manera en que alguien te ve dice más de él que de ti.

Tú no puedes controlar las gafas con las que te miran los demás.

Solo puedes decidir si quieres pasar la vida intentando cambiarlas o empezar a mirarte con las tuyas.`,
  },
  {
    reflection_id: "7",
    language: "en",
    title: "Other people’s glasses",
    content: `Worrying about what other people think is useless.

Every person looks at the world through glasses tinted with their own reality: their experiences, their beliefs, their fears, and everything they have lived.

That is why the way someone sees you says more about them than about you.

You cannot control the glasses others use to look at you.

You can only decide whether you want to spend your life trying to change them, or start looking at yourself through your own.`,
  },
  {
    reflection_id: "7",
    language: "fr",
    title: "Les lunettes des autres",
    content: `Te préoccuper de ce que pensent les autres est inutile.

Chaque personne regarde le monde à travers des lunettes teintées de sa propre réalité : ses expériences, ses croyances, ses peurs et tout ce qu’elle a vécu.

C’est pourquoi la façon dont quelqu’un te voit en dit plus sur lui que sur toi.

Tu ne peux pas contrôler les lunettes avec lesquelles les autres te regardent.

Tu peux seulement décider si tu veux passer ta vie à essayer de les changer, ou commencer à te regarder avec les tiennes.`,
  },

  // ─── 08 ───
  {
    reflection_id: "8",
    language: "ca",
    title: "Ser abans que fer",
    content: `No tot requereix un esforç extrem.

Ens han ensenyat a associar l'esforç amb el valor: com més costa, més mèrit té. Com si arribar més lluny sempre impliqués fer més, aguantar més o exigir-nos més.

Però no sempre és així.

Hi ha coses que requereixen disciplina, constància i compromís, però no necessàriament patiment.

Quan actuem des de la por, la necessitat o la desesperació, sovint sentim que hem de fer més i més per aconseguir-ho.

I potser no sempre cal fer més. Potser cal fer-ho d'una altra manera.

Quan primer ordenem el nostre interior, també canvia la manera com actuem a l'exterior.

No sempre cal fer més.
A vegades cal ser més.

I des d'aquest lloc, actuar.`,
  },
  {
    reflection_id: "8",
    language: "es",
    title: "Ser antes que hacer",
    content: `No todo requiere un esfuerzo extremo.

Nos han enseñado a asociar el esfuerzo con el valor: cuanto más cuesta, más mérito tiene. Como si llegar más lejos siempre implicara hacer más, aguantar más o exigirnos más.

Pero no siempre es así.

Hay cosas que requieren disciplina, constancia y compromiso, pero no necesariamente sufrimiento.

Cuando actuamos desde el miedo, la necesidad o la desesperación, a menudo sentimos que tenemos que hacer más y más para conseguirlo.

Y quizá no siempre hace falta hacer más. Quizá hace falta hacerlo de otra manera.

Cuando primero ordenamos nuestro interior, también cambia la manera en que actuamos en el exterior.

No siempre hace falta hacer más.
A veces hace falta ser más.

Y desde ese lugar, actuar.`,
  },
  {
    reflection_id: "8",
    language: "en",
    title: "Being before doing",
    content: `Not everything requires extreme effort.

We have been taught to associate effort with value: the harder it is, the more merit it has. As if going further always meant doing more, enduring more, or demanding more of ourselves.

But it is not always like that.

There are things that require discipline, consistency and commitment, but not necessarily suffering.

When we act from fear, need or despair, we often feel we must do more and more to get there.

And maybe it is not always necessary to do more. Maybe we need to do it differently.

When we first put our inner world in order, the way we act outwardly also changes.

It is not always necessary to do more.
Sometimes we need to be more.

And from that place, act.`,
  },
  {
    reflection_id: "8",
    language: "fr",
    title: "Être avant de faire",
    content: `Tout ne demande pas un effort extrême.

On nous a appris à associer l’effort à la valeur : plus cela coûte, plus cela a du mérite. Comme si aller plus loin impliquait toujours d’en faire plus, de tenir plus ou de nous exiger davantage.

Mais ce n’est pas toujours le cas.

Il y a des choses qui demandent de la discipline, de la constance et de l’engagement, mais pas forcément de la souffrance.

Quand nous agissons depuis la peur, le besoin ou le désespoir, nous sentons souvent que nous devons en faire toujours plus pour y arriver.

Et peut-être qu’il n’est pas toujours nécessaire d’en faire plus. Peut-être faut-il le faire autrement.

Quand nous mettons d’abord de l’ordre en nous, la façon dont nous agissons à l’extérieur change aussi.

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

  // ─── 11 ───
  {
    reflection_id: "11",
    language: "ca",
    title: "La part de tu que ja no existeix",
    content: `Quan perdem algú, tendim a pensar que el dolor prové únicament de la seva absència. Però una relació també construeix una versió de nosaltres.

No som exactament els mateixos amb la nostra família, amb els amics, amb una parella o quan estem sols. Cada vincle desperta parts diferents de nosaltres: maneres de parlar, de pensar, de sentir, de cuidar, de riure, de mirar el món.

Per això, quan una persona important desapareix de la nostra vida, no només deixem de tenir-la a ella. També deixem de tenir l'espai on existia aquella versió de nosaltres.

I potser per això, després d'una pèrdua, podem sentir que no només trobem a faltar l'altra persona. També ens trobem a faltar a nosaltres mateixos.

El dol, en certa manera, és aprendre a viure sense aquella relació i descobrir qui som ara que ja no hi és.

No es tracta de tornar a ser qui érem abans. Es tracta de retrobar les parts de nosaltres que aquella relació havia despertat, conservar les que encara ens pertanyen i deixar espai perquè en neixin de noves.

Perquè cada persona que passa per la nostra vida deixa una empremta en qui som.

I quan marxa, potser una part de nosaltres marxa amb ella.`,
  },
  {
    reflection_id: "11",
    language: "es",
    title: "La parte de ti que ya no existe",
    content: `Cuando perdemos a alguien, tendemos a pensar que el dolor proviene únicamente de su ausencia. Pero una relación también construye una versión de nosotros.

No somos exactamente los mismos con nuestra familia, con los amigos, con una pareja o cuando estamos solos. Cada vínculo despierta partes distintas de nosotros: maneras de hablar, de pensar, de sentir, de cuidar, de reír, de mirar el mundo.

Por eso, cuando una persona importante desaparece de nuestra vida, no solo dejamos de tenerla a ella. También dejamos de tener el espacio donde existía aquella versión de nosotros.

Y quizá por eso, después de una pérdida, podemos sentir que no solo echamos de menos a la otra persona. También nos echamos de menos a nosotros mismos.

El duelo, en cierta manera, es aprender a vivir sin aquella relación y descubrir quiénes somos ahora que ya no está.

No se trata de volver a ser quien éramos antes. Se trata de reencontrar las partes de nosotros que aquella relación había despertado, conservar las que aún nos pertenecen y dejar espacio para que nazcan otras nuevas.

Porque cada persona que pasa por nuestra vida deja una huella en quiénes somos.

Y cuando se marcha, quizá una parte de nosotros se va con ella.`,
  },
  {
    reflection_id: "11",
    language: "en",
    title: "The part of you that no longer exists",
    content: `When we lose someone, we tend to think the pain comes only from their absence. But a relationship also builds a version of us.

We are not exactly the same with our family, with friends, with a partner, or when we are alone. Every bond awakens different parts of us: ways of speaking, thinking, feeling, caring, laughing, looking at the world.

That is why, when an important person disappears from our life, we do not only lose them. We also lose the space where that version of ourselves existed.

And maybe that is why, after a loss, we can feel that we do not only miss the other person. We also miss ourselves.

Grief, in a way, is learning to live without that relationship and discovering who we are now that they are gone.

It is not about becoming who we were before. It is about finding again the parts of ourselves that relationship had awakened, keeping those that still belong to us, and leaving space for new ones to grow.

Because every person who passes through our life leaves a mark on who we are.

And when they leave, maybe a part of us leaves with them.`,
  },
  {
    reflection_id: "11",
    language: "fr",
    title: "La part de toi qui n’existe plus",
    content: `Quand nous perdons quelqu’un, nous avons tendance à penser que la douleur vient uniquement de son absence. Mais une relation construit aussi une version de nous.

Nous ne sommes pas exactement les mêmes avec notre famille, avec nos amis, avec un partenaire ou quand nous sommes seuls. Chaque lien éveille des parts différentes de nous : des façons de parler, de penser, de sentir, de prendre soin, de rire, de regarder le monde.

C’est pourquoi, quand une personne importante disparaît de notre vie, nous ne cessons pas seulement de l’avoir. Nous cessons aussi d’avoir l’espace où existait cette version de nous.

Et c’est peut-être pour cela qu’après une perte, nous pouvons sentir que nous ne manquons pas seulement l’autre personne. Nous nous manquons aussi à nous-mêmes.

Le deuil, d’une certaine manière, c’est apprendre à vivre sans cette relation et découvrir qui nous sommes maintenant qu’elle n’est plus là.

Il ne s’agit pas de redevenir qui nous étions avant. Il s’agit de retrouver les parts de nous que cette relation avait éveillées, conserver celles qui nous appartiennent encore et laisser de la place pour que d’autres naissent.

Parce que chaque personne qui passe dans notre vie laisse une empreinte sur qui nous sommes.

Et quand elle part, peut-être qu’une part de nous part avec elle.`,
  },

  // ─── 12 ───
  {
    reflection_id: "12",
    language: "ca",
    title: "L'èxit",
    content: `Durant molt de temps hem associat l'èxit amb arribar més lluny, tenir més, aconseguir més.

Però potser l'èxit no té tant a veure amb tot allò que aconseguim, sinó amb com ens sentim mentre vivim la nostra vida.

Per mi, l'èxit és la benedicció de sentir-se en pau i feliç amb el que fem, sigui on sigui i amb qui sigui.

Una pau que no depèn de tenir-ho tot resolt.
Una felicitat que no necessita grans motius.

La possibilitat de mirar la vida que tens i sentir que, malgrat tot el que encara pugui faltar, no voldries estar en un altre lloc ni ser una altra persona.

Potser l'èxit més gran no és arribar a una vida extraordinària.

És arribar a una vida que, per a tu, se senti bé.

Una pau pura.
Una felicitat senzilla.`,
  },
  {
    reflection_id: "12",
    language: "es",
    title: "El éxito",
    content: `Durante mucho tiempo hemos asociado el éxito con llegar más lejos, tener más, conseguir más.

Pero quizá el éxito no tiene tanto que ver con todo aquello que conseguimos, sino con cómo nos sentimos mientras vivimos nuestra vida.

Para mí, el éxito es la bendición de sentirse en paz y feliz con lo que hacemos, sea donde sea y con quien sea.

Una paz que no depende de tenerlo todo resuelto.
Una felicidad que no necesita grandes motivos.

La posibilidad de mirar la vida que tienes y sentir que, a pesar de todo lo que aún pueda faltar, no querrías estar en otro lugar ni ser otra persona.

Quizá el mayor éxito no es llegar a una vida extraordinaria.

Es llegar a una vida que, para ti, se sienta bien.

Una paz pura.
Una felicidad sencilla.`,
  },
  {
    reflection_id: "12",
    language: "en",
    title: "Success",
    content: `For a long time we have associated success with going further, having more, achieving more.

But maybe success has less to do with everything we achieve, and more with how we feel while we live our life.

For me, success is the blessing of feeling at peace and happy with what we do, wherever we are and with whoever we are.

A peace that does not depend on having everything sorted.
A happiness that does not need grand reasons.

The possibility of looking at the life you have and feeling that, despite everything that may still be missing, you would not want to be somewhere else or someone else.

Maybe the greatest success is not reaching an extraordinary life.

It is reaching a life that, for you, feels good.

A pure peace.
A simple happiness.`,
  },
  {
    reflection_id: "12",
    language: "fr",
    title: "Le succès",
    content: `Pendant longtemps, nous avons associé le succès à aller plus loin, avoir plus, obtenir plus.

Mais peut-être que le succès n’a pas tant à voir avec tout ce que nous obtenons, qu’avec la façon dont nous nous sentons pendant que nous vivons notre vie.

Pour moi, le succès est la bénédiction de se sentir en paix et heureux avec ce que l’on fait, où que l’on soit et avec qui que l’on soit.

Une paix qui ne dépend pas d’avoir tout réglé.
Un bonheur qui n’a pas besoin de grandes raisons.

La possibilité de regarder la vie que l’on a et de sentir que, malgré tout ce qui peut encore manquer, on ne voudrait être nulle part ailleurs ni être quelqu’un d’autre.

Peut-être que le plus grand succès n’est pas d’arriver à une vie extraordinaire.

C’est d’arriver à une vie qui, pour toi, se sente bien.

Une paix pure.
Un bonheur simple.`,
  },

  // ─── 13 ───
  {
    reflection_id: "13",
    language: "ca",
    title: "Decisions",
    content: `La nostra vida pot arribar a assemblar-se molt més al que imaginem del que sovint ens permetem creure.

Cada decisió que prenem, fins i tot les més petites, ens condueix en una direcció. Algunes ens apropen a la vida que volem. D'altres ens mantenen exactament on som. I moltes vegades no ens n'adonem perquè esperem que el canvi arribi abans de començar a actuar d'una manera diferent.

Vivim envoltats de possibilitats. Hi ha versions de la nostra vida que encara no coneixem i que podrien arribar a ser perfectament nostres. Però perquè una realitat canviï, alguna cosa dins nostre també ha de canviar.

A vegades diem que volem una vida diferent, però encara no estem preparats per assumir tot el que implica arribar-hi. Perquè tota nova realitat té un preu: deixar enrere hàbits, persones, comoditats, maneres de pensar o decisions que ja no són coherents amb qui volem ser.

No sempre ens falta capacitat. De vegades ens falta disposició.

Canviar de vida no consisteix només a decidir què volem aconseguir. Consisteix a començar a prendre les decisions que prendria la persona que ja viu aquesta realitat.

Per això, potser la pregunta no és:

«Què vull que canviï a la meva vida?»

Sinó:

«Si ja visqués en la meva nova realitat, com actuaria? Com pensaria? Com viuria? Com parlaria? I, sobretot, quines decisions prendria?»

Perquè, al final, cada decisió és una direcció.

I potser canviar de realitat no consisteix a esperar que la nostra vida canviï, sinó a començar a comportar-nos com si ja haguéssim escollit cap a on volem anar.`,
  },
  {
    reflection_id: "13",
    language: "es",
    title: "Decisiones",
    content: `Nuestra vida puede llegar a parecerse mucho más a lo que imaginamos de lo que a menudo nos permitimos creer.

Cada decisión que tomamos, incluso las más pequeñas, nos conduce en una dirección. Algunas nos acercan a la vida que queremos. Otras nos mantienen exactamente donde estamos. Y muchas veces no nos damos cuenta porque esperamos que el cambio llegue antes de empezar a actuar de una manera distinta.

Vivimos rodeados de posibilidades. Hay versiones de nuestra vida que aún no conocemos y que podrían llegar a ser perfectamente nuestras. Pero para que una realidad cambie, algo dentro de nosotros también tiene que cambiar.

A veces decimos que queremos una vida diferente, pero aún no estamos preparados para asumir todo lo que implica llegar ahí. Porque toda nueva realidad tiene un precio: dejar atrás hábitos, personas, comodidades, maneras de pensar o decisiones que ya no son coherentes con quien queremos ser.

No siempre nos falta capacidad. A veces nos falta disposición.

Cambiar de vida no consiste solo en decidir qué queremos conseguir. Consiste en empezar a tomar las decisiones que tomaría la persona que ya vive esa realidad.

Por eso, quizá la pregunta no es:

«¿Qué quiero que cambie en mi vida?»

Sino:

«Si ya viviera en mi nueva realidad, ¿cómo actuaría? ¿Cómo pensaría? ¿Cómo viviría? ¿Cómo hablaría? Y, sobre todo, ¿qué decisiones tomaría?»

Porque, al final, cada decisión es una dirección.

Y quizá cambiar de realidad no consiste en esperar a que nuestra vida cambie, sino en empezar a comportarnos como si ya hubiéramos elegido hacia dónde queremos ir.`,
  },
  {
    reflection_id: "13",
    language: "en",
    title: "Decisions",
    content: `Our life can come to look far more like what we imagine than we often allow ourselves to believe.

Every decision we make, even the smallest ones, leads us in a direction. Some bring us closer to the life we want. Others keep us exactly where we are. And often we do not notice, because we wait for change to arrive before we start acting differently.

We live surrounded by possibilities. There are versions of our life we do not yet know, and that could become perfectly ours. But for a reality to change, something inside us also has to change.

Sometimes we say we want a different life, but we are not yet ready to take on everything it takes to get there. Because every new reality has a price: leaving behind habits, people, comforts, ways of thinking, or decisions that are no longer consistent with who we want to be.

It is not always capacity we lack. Sometimes it is willingness.

Changing your life is not only about deciding what you want to achieve. It is about starting to make the decisions the person who already lives that reality would make.

That is why, maybe, the question is not:

«What do I want to change in my life?»

But:

«If I already lived in my new reality, how would I act? How would I think? How would I live? How would I speak? And above all, what decisions would I make?»

Because, in the end, every decision is a direction.

And maybe changing reality is not about waiting for our life to change, but about starting to behave as if we had already chosen where we want to go.`,
  },
  {
    reflection_id: "13",
    language: "fr",
    title: "Décisions",
    content: `Notre vie peut finir par ressembler bien plus à ce que nous imaginons que ce que nous nous permettons souvent de croire.

Chaque décision que nous prenons, même les plus petites, nous conduit dans une direction. Certaines nous rapprochent de la vie que nous voulons. D’autres nous maintiennent exactement là où nous sommes. Et bien souvent, nous ne nous en rendons pas compte parce que nous attendons que le changement arrive avant de commencer à agir autrement.

Nous vivons entourés de possibilités. Il existe des versions de notre vie que nous ne connaissons pas encore et qui pourraient parfaitement devenir nôtres. Mais pour qu’une réalité change, quelque chose en nous doit aussi changer.

Parfois, nous disons que nous voulons une vie différente, mais nous ne sommes pas encore prêts à assumer tout ce que cela implique d’y arriver. Parce que toute nouvelle réalité a un prix : laisser derrière soi des habitudes, des personnes, des confort, des façons de penser ou des décisions qui ne sont plus cohérentes avec qui nous voulons être.

Ce n’est pas toujours la capacité qui nous manque. Parfois, c’est la disposition.

Changer de vie ne consiste pas seulement à décider ce que l’on veut obtenir. Cela consiste à commencer à prendre les décisions que prendrait la personne qui vit déjà cette réalité.

C’est pourquoi, peut-être, la question n’est pas :

« Que veux-je qui change dans ma vie ? »

Mais :

« Si je vivais déjà dans ma nouvelle réalité, comment agirais-je ? Comment penserais-je ? Comment vivrais-je ? Comment parlerais-je ? Et surtout, quelles décisions prendrais-je ? »

Parce qu’au fond, chaque décision est une direction.

Et peut-être que changer de réalité ne consiste pas à attendre que notre vie change, mais à commencer à nous comporter comme si nous avions déjà choisi où nous voulons aller.`,
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
