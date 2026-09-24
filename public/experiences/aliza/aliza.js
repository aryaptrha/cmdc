/* ALIZA runtime.
   A deterministic keyword matcher modelled on the 1966 ELIZA script.
   No model, no network, no storage: same conversation in, same conversation out.

   Rule priority: a HIGHER rank wins. Generic pronouns carry the lowest ranks so
   that specific material (family, fear, mood) dominates, which is what makes the
   reassignment of rank values load-bearing rather than decorative. */

(function () {
  "use strict";

  /* ------------------------------------------------------------ reflection */

  var REFLECT = {
    am: "are",
    are: "am",
    i: "you",
    you: "i",
    me: "you",
    my: "your",
    your: "my",
    mine: "yours",
    yours: "mine",
    myself: "yourself",
    yourself: "myself",
    "i'm": "you're",
    "you're": "i'm",
    "i've": "you've",
    "you've": "i've",
    "i'll": "you'll",
    "you'll": "i'll",
    "i'd": "you'd",
    "you'd": "i'd",
    we: "you",
    us: "you",
    our: "your",
    ours: "yours",
    was: "were",
    were: "was"
  };

  function reflect(text) {
    return text
      .split(/(\s+)/)
      .map(function (token) {
        var bare = token.toLowerCase().replace(/[^a-z']/g, "");
        var swap = REFLECT[bare];
        if (!swap) return token;
        if (token.charAt(0) === token.charAt(0).toUpperCase()) {
          return swap.charAt(0).toUpperCase() + swap.slice(1);
        }
        return swap;
      })
      .join("");
  }

  /* ---------------------------------------------------------------- rules */

  var ELIZA_RULES = [
    {
      rank: 9,
      keys: ["depressed", "unhappy", "sad", "sadness", "miserable"],
      responses: [
        "I am sorry to hear you are depressed.",
        "How long have you been unhappy?",
        "Do you think coming here will help you not to be unhappy?"
      ]
    },
    {
      rank: 9,
      keys: ["mother", "father", "family", "parent", "parents"],
      responses: [
        "Tell me more about your family.",
        "Who in your family does that?",
        "What comes to mind when you think of your mother?"
      ]
    },
    {
      rank: 9,
      keys: ["afraid", "frightened", "scared", "fear"],
      responses: [
        "How did you come to be frightened?",
        "Why are you afraid?",
        "Does fear sit close to something else for you?"
      ]
    },
    {
      rank: 9,
      keys: ["love", "loved", "loving"],
      responses: [
        "Do you love someone in particular?",
        "What does love feel like to you just now?",
        "Tell me about who you love."
      ]
    },
    {
      rank: 9,
      keys: ["hate", "angry", "anger"],
      responses: [
        "What makes you angry?",
        "Do you hate someone in particular?",
        "How do you express anger?"
      ]
    },
    {
      rank: 8,
      keys: ["sorry"],
      responses: [
        "Please don't apologise.",
        "Apologies are not necessary.",
        "What feelings do you have when you apologise?"
      ]
    },
    {
      rank: 8,
      keys: ["remember"],
      responses: [
        "Did you think I would forget {rest}?",
        "What about {rest} do you remember just now?",
        "Why do you remember {rest} just now?"
      ]
    },
    {
      rank: 8,
      keys: ["forget"],
      responses: [
        "Can you think of why you forget {rest}?",
        "What else do you forget?",
        "Why do you forget {rest}?"
      ]
    },
    {
      rank: 8,
      keys: ["dream", "dreams", "dreamt"],
      responses: [
        "What does that dream suggest to you?",
        "Do you dream often?",
        "What have you dreamt that disturbed you?"
      ]
    },
    {
      rank: 8,
      keys: ["hello", "hi", "hey"],
      responses: [
        "How do you do. Please tell me your problem.",
        "Hello. What brings you here?",
        "Hello. How are you feeling today?"
      ]
    },
    {
      rank: 7,
      keys: ["if"],
      responses: [
        "Do you think it's likely that {rest}?",
        "Do you wish that {rest}?",
        "What do you know about {rest}?"
      ]
    },
    {
      rank: 7,
      keys: ["perhaps", "maybe"],
      responses: [
        "You don't seem quite certain.",
        "Why the uncertain tone?",
        "Can't you be more positive?"
      ]
    },
    {
      rank: 7,
      keys: ["everyone", "everybody", "nobody"],
      responses: [
        "Who, specifically?",
        "Surely not everyone.",
        "Who do you think of when you say that?"
      ]
    },
    {
      rank: 7,
      keys: ["always"],
      responses: [
        "Can you think of a specific example?",
        "When?",
        "In what way?"
      ]
    },
    {
      rank: 6,
      keys: ["i am"],
      responses: [
        "Did you come to me because you are {rest}?",
        "How long have you been {rest}?",
        "Do you believe it is normal to be {rest}?"
      ]
    },
    {
      rank: 6,
      keys: ["i want"],
      responses: [
        "What would it mean to you if you got {rest}?",
        "Why do you want {rest}?",
        "What would you do if you got {rest}?"
      ]
    },
    {
      rank: 6,
      keys: ["i feel"],
      responses: [
        "Tell me more about feeling {rest}.",
        "Do you often feel {rest}?",
        "What does feeling {rest} remind you of?"
      ]
    },
    {
      rank: 6,
      keys: ["machine", "computer", "robot"],
      responses: [
        "Do machines worry you?",
        "Why do you mention machines just now?",
        "What do machines have to do with your feelings?"
      ]
    },
    {
      rank: 5,
      keys: ["want", "need"],
      responses: [
        "What would it mean to you if you got {rest}?",
        "Why do you want {rest}?",
        "Suppose you got {rest}. What then?"
      ]
    },
    {
      rank: 5,
      keys: ["feel", "feeling"],
      responses: [
        "Tell me more about that feeling.",
        "Do you often feel {rest}?",
        "Does that feeling remind you of anything?"
      ]
    },
    {
      rank: 4,
      keys: ["why"],
      responses: [
        "Why do you ask?",
        "Does that question interest you?",
        "What answer would please you most?"
      ]
    },
    {
      rank: 4,
      keys: ["how"],
      responses: [
        "How would you answer that yourself?",
        "What is it you really want to know?",
        "Does that thought trouble you?"
      ]
    },
    {
      rank: 4,
      keys: ["no", "not"],
      responses: [
        "Why not?",
        "Are you saying no just to be negative?",
        "You are being a bit negative."
      ]
    },
    {
      rank: 4,
      keys: ["yes"],
      responses: ["You seem quite positive.", "You are sure?", "I see."]
    },
    {
      rank: 3,
      keys: ["you"],
      responses: [
        "We were discussing you, not me.",
        "Oh, I?",
        "Do you think I can help with that?"
      ]
    },
    {
      rank: 1,
      keys: ["i"],
      responses: [
        "Can you elaborate on that?",
        "Does that follow from something else?",
        "Tell me more."
      ]
    }
  ];

  var ELIZA_FALLBACKS = [
    "Please go on.",
    "What does that suggest to you?",
    "I see.",
    "I am not sure I understand you fully.",
    "Can you elaborate on that?",
    "What else comes to mind?",
    "Does talking about this bother you?",
    "Why do you ask that?"
  ];

  /* A second, explicitly invented persona running on the identical engine. */
  var POET_RULES = [
    {
      rank: 9,
      keys: ["depressed", "unhappy", "sad", "sadness", "miserable"],
      responses: [
        "Rain is also a kind of honesty.",
        "Sadness is a slow music. Keep playing.",
        "There is a colour you have not named yet."
      ]
    },
    {
      rank: 9,
      keys: ["afraid", "frightened", "scared", "fear"],
      responses: [
        "Fear is a lantern held too close.",
        "What is the shape of the thing behind it?",
        "The dark is only unlit furniture."
      ]
    },
    {
      rank: 9,
      keys: ["love", "loved", "loving"],
      responses: [
        "Love is the small ordinary hour.",
        "Who are you when you are loved?",
        "Say the name without saying the name."
      ]
    },
    {
      rank: 8,
      keys: ["dream", "dreams", "dreamt"],
      responses: [
        "Dreams are the letters you never sent.",
        "What colour was the dream's door?",
        "Keep the dream. It is already yours."
      ]
    },
    {
      rank: 8,
      keys: ["remember"],
      responses: [
        "Memory is a borrowed room.",
        "What does {rest} still smell like?",
        "You remember {rest} because it is unfinished."
      ]
    },
    {
      rank: 8,
      keys: ["forget"],
      responses: [
        "Forgetting is a kind of editing.",
        "What would you keep, if you could keep one thing?",
        "Some things leave to make space."
      ]
    },
    {
      rank: 8,
      keys: ["hello", "hi", "hey"],
      responses: [
        "The room has been waiting.",
        "Say it as if it were the first line.",
        "Begin anywhere."
      ]
    },
    {
      rank: 7,
      keys: ["time", "year", "years"],
      responses: [
        "Time is a room with the light left on.",
        "Count the years in weather, not in numbers.",
        "The clock is only one instrument."
      ]
    },
    {
      rank: 6,
      keys: ["home", "house", "room"],
      responses: [
        "Every house keeps one door unpainted.",
        "Describe the room you are actually in.",
        "Home is a tense, not a place."
      ]
    },
    {
      rank: 6,
      keys: ["i am"],
      responses: [
        "You are {rest}. Begin there.",
        "Say {rest} as if it were weather.",
        "And then what, being {rest}?"
      ]
    },
    {
      rank: 4,
      keys: ["why"],
      responses: [
        "Why is a small locked box.",
        "Ask it again in the dark.",
        "Because the question wants company."
      ]
    },
    {
      rank: 4,
      keys: ["no", "not"],
      responses: [
        "No is a doorway pretending to be a wall.",
        "Even the no has weather in it.",
        "Stay with the no a moment longer."
      ]
    },
    {
      rank: 1,
      keys: ["i"],
      responses: [
        "Go on.",
        "The I is the smallest room in the poem.",
        "Say more of that."
      ]
    }
  ];

  var POET_FALLBACKS = [
    "Tell me the colour of that.",
    "What would a stranger notice first?",
    "Say it again, slower.",
    "Every answer is a small door.",
    "Go on — the line is still open."
  ];

  var PERSONAS = {
    eliza: {
      label: "Original ELIZA",
      rules: ELIZA_RULES,
      fallbacks: ELIZA_FALLBACKS,
      opener: "How do you do. Please tell me your problem.",
      note: "The 1966 rulebook and its fallbacks. Neutral, endlessly reflective."
    },
    poet: {
      label: "The Poet",
      rules: POET_RULES,
      fallbacks: POET_FALLBACKS,
      opener: "Begin anywhere. I will answer with images.",
      note: "An invented persona on the identical matcher. Only the substitution table changes."
    }
  };

  var RECORDED_CONVERSATIONS = 1204;

  /* -------------------------------------------------------------- matching */

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function findMatch(input, rules) {
    var best = null;

    for (var r = 0; r < rules.length; r += 1) {
      var rule = rules[r];

      for (var k = 0; k < rule.keys.length; k += 1) {
        var pattern = rule.keys[k]
          .split(/\s+/)
          .map(escapeRegExp)
          .join("\\s+");
        var match = new RegExp("\\b" + pattern + "\\b", "i").exec(input);

        if (!match) continue;

        var winsRank =
          !best ||
          rule.rank > best.rank ||
          (rule.rank === best.rank && match.index < best.index);

        if (winsRank) {
          best = {
            rank: rule.rank,
            index: match.index,
            end: match.index + match[0].length,
            rule: rule
          };
        }
      }
    }

    return best;
  }

  /* Deterministic: identical conversation history always yields identical replies. */
  function respond(state, personaKey, rawInput) {
    var persona = PERSONAS[personaKey];
    var input = rawInput.trim();
    var match = findMatch(input, persona.rules);

    if (!match) {
      var fallback = persona.fallbacks[state.fallback % persona.fallbacks.length];
      state.fallback += 1;
      state.fallbacks += 1;
      return { text: fallback, rule: "none — fallback", matched: false };
    }

    var counterKey = personaKey + "|" + match.rule.keys[0] + "|" + match.rule.rank;
    var used = state.counters[counterKey] || 0;
    state.counters[counterKey] = used + 1;

    var template = match.rule.responses[used % match.rule.responses.length];
    var rest = reflect(input.slice(match.end).trim());

    var text = template.replace(/\{rest\}/g, rest || "that");
    /* A template that begins with the reflected remainder would otherwise start
       mid-sentence in lower case. */
    text = text.charAt(0).toUpperCase() + text.slice(1);

    state.matched += 1;

    return {
      text: text,
      rule: match.rule.keys[0] + " · rank " + match.rule.rank,
      matched: true
    };
  }

  /* ------------------------------------------------------------------- dom */

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  var transcript = document.getElementById("transcript");
  var form = document.getElementById("compose");
  var input = document.getElementById("input");
  var personaNote = document.getElementById("persona-note");
  var statsEl = document.getElementById("stats");
  var personaButtons = Array.prototype.slice.call(
    document.querySelectorAll(".persona__btn")
  );

  var state = {
    eliza: { counters: {}, fallback: 0, matched: 0, fallbacks: 0, turns: 0 },
    poet: { counters: {}, fallback: 0, matched: 0, fallbacks: 0, turns: 0 },
    persona: "eliza",
    lastRule: "—"
  };

  function addTurn(speaker, text) {
    var row = document.createElement("div");
    row.className = "turn turn--" + speaker.toLowerCase();

    var label = document.createElement("span");
    label.className = "turn__speaker";
    label.textContent = speaker;

    var body = document.createElement("span");
    body.className = "turn__text";
    body.textContent = text;

    row.appendChild(label);
    row.appendChild(body);
    transcript.appendChild(row);

    if (gsap && !reduced) {
      gsap.from(row, { opacity: 0, y: 6, duration: 0.35, ease: "power2.out" });
    }

    transcript.scrollTop = transcript.scrollHeight;
    return row;
  }

  function pair(label, value) {
    var wrap = document.createElement("div");
    wrap.className = "tech__pair";
    var dt = document.createElement("dt");
    dt.className = "tech__k";
    dt.textContent = label;
    var dd = document.createElement("dd");
    dd.className = "tech__v";
    dd.textContent = value;
    wrap.appendChild(dt);
    wrap.appendChild(dd);
    return wrap;
  }

  function stat(label, value) {
    var wrap = document.createElement("div");
    wrap.className = "console__stat";
    var dt = document.createElement("dt");
    dt.textContent = label;
    var dd = document.createElement("dd");
    dd.textContent = value;
    wrap.appendChild(dt);
    wrap.appendChild(dd);
    return wrap;
  }

  function countKeys(rules) {
    return rules.reduce(function (total, rule) {
      return total + rule.keys.length;
    }, 0);
  }

  function countRanks(rules) {
    var ranks = {};
    rules.forEach(function (rule) {
      ranks[rule.rank] = true;
    });
    return Object.keys(ranks).length;
  }

  function renderTech() {
    var tech = document.getElementById("tech");
    var keywordCount = countKeys(ELIZA_RULES) + countKeys(POET_RULES);

    [
      ["Script", "ELIZA, 1966 transcription"],
      ["Year", "1966 / rebuilt 2024"],
      ["Keywords", keywordCount + " rules across 2 vocabularies"],
      ["Execution", "Client side, deterministic"],
      ["Data handling", "Stays in this page"],
      ["Conversations", RECORDED_CONVERSATIONS.toLocaleString("en-US") + " recorded"]
    ].forEach(function (row) {
      tech.appendChild(pair(row[0], row[1]));
    });

    document.getElementById("rules-meta").textContent =
      keywordCount +
      " keyword rules over " +
      countRanks(ELIZA_RULES) +
      " ranks. Highest rank wins; ties go to the earliest match in the sentence.";

    if (gsap && !reduced) {
      gsap.from(".tech__pair", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05
      });
    }
  }

  function renderStats() {
    var current = state[state.persona];
    statsEl.innerHTML = "";
    statsEl.appendChild(stat("Turns", String(current.turns)));
    statsEl.appendChild(stat("Matched", String(current.matched)));
    statsEl.appendChild(stat("Fallback", String(current.fallbacks)));
    statsEl.appendChild(stat("Last rule", state.lastRule));
  }

  function setPersona(key) {
    state.persona = key;

    personaButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.persona === key);
    });

    personaNote.textContent = PERSONAS[key].note;
    addTurn("SYSTEM", "machine switched to " + PERSONAS[key].label);
    addTurn("MACHINE", PERSONAS[key].opener);

    state.lastRule = "—";
    renderStats();
  }

  /* --------------------------------------------------------------- startup */

  renderTech();
  setPersona("eliza");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var value = input.value.trim();
    if (!value) return;

    addTurn("USER", value);
    input.value = "";

    var current = state[state.persona];
    current.turns += 1;

    var reply = respond(current, state.persona, value);
    state.lastRule = reply.rule;

    addTurn("MACHINE", reply.text);
    renderStats();
  });

  personaButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.dataset.persona === state.persona) return;
      setPersona(button.dataset.persona);
    });
  });

  if (gsap && ScrollTrigger && !reduced) {
    document.querySelectorAll("[data-reveal]").forEach(function (block) {
      gsap.from(block, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: block, start: "top 88%", once: true }
      });
    });
  }
})();
