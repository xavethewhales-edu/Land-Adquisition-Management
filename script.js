/* ==== Brand signature & banner ======================================== */
(function attachBrandSignature(){
  const SIGN = Object.freeze({
    brand: "xavethewhales-games",
    owner: "xavethewhales-edu",
    site : "xavethewhales-edu.github.io",
    built: new Date().toISOString().slice(0,10)
  });

  // Non-writable, non-configurable global (soft provenance)
  try {
    Object.defineProperty(window, "__XWTW_SIGNATURE__", {
      value: SIGN, writable: false, configurable: false, enumerable: false
    });
  } catch(_) {}

  // Console banner
  try {
    console.log(
      "%cBuilt by " + SIGN.brand + " · © " + (new Date().getFullYear()),
      "background:#00ffff;color:#000;font-weight:700;padding:2px 6px;border-radius:6px"
    );
  } catch(_) {}

  // Invisible HTML comment (shows up in page source)
  try { document.documentElement.appendChild(document.createComment(
    " Built by " + SIGN.brand + " (" + SIGN.site + ") "
  )); } catch(_) {}
})();

/* ==== Soft provenance check + tiny helpers ============================ */
(function softProvenance(){
  // Warn (non-fatal) if signature is missing or altered
  try {
    const s = window.__XWTW_SIGNATURE__ || {};
    if (s.brand !== "xavethewhales-games") {
      console.warn("[Provenance] Signature missing or altered. If you’re seeing this on a mirror, visit:",
                   "https://xavethewhales-edu.github.io/");
    }
  } catch(_) {}

  // Helper: normalize asset paths for GitHub Pages (no leading slash)
  window.asRel = function asRel(p){ return (typeof p === "string") ? p.replace(/^\//, "") : p; };

  // Helper: safe register functions (no-ops if your register* aren’t present)
  window.registerNode     = window.registerNode     || function(){};
  window.registerListener = window.registerListener || function(t,e,h){ try{ t.addEventListener(e,h); }catch(_){} };
  window.registerCleanup  = window.registerCleanup  || function(){};
})();


// FULL RESTORED SCRIPT.JS

const scenes = {
  "scene1": {
    text: `An urgent lead is waiting in your inbox. It could help you meet your land acquisition targets.\n\nIt is a compact commercial plot in Chamartín. Prime location near public transport, strong visibility — but the asking price exceeds your department’s typical range.`,
    image: "images/scene1.png",
    scramble: [
      "The", "preliminary", "valuation", "of", "the",
      "offer", "exceeds", "market expectations", "significantly"
    ],
    correct: [
      "The", "preliminary", "valuation", "of", "the",
      "offer", "exceeds", "market expectations", "significantly"
    ],
    next: "scene2"
  },

  "scene2": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Email from Marta Cebrián – Financial Controller</strong></p>
        <p>Hi Alan,<br><br>
        Thanks for the summary. I’ve reviewed the Chamartín file and need to flag that the current asking price exceeds our Q3 land acquisition ceiling by approximately 12%.<br><br>
        While the location is certainly attractive, this will require a formal justification — especially given current cash flow priorities.<br><br>
        If you believe the deal has strategic merit, please draft a short memo outlining the case for exception and forward it to me before 4 p.m. today.<br><br>
        Best,<br>Marta</p>
      </div>
      <div class="chat-message">💬 Valuation: “It’s priced like it’s Q1, not Q3. Just so you know.”</div>
      <div class="decision-buttons">
        <button onclick="loadScene('scene2A')">Justify the deal</button>
        <button onclick="loadScene('scene2B')">Delay and review alternatives</button>
      </div>
    `;
  }
},

"scene2A": {
  render: function(container) {
    container.innerHTML = `
      <p class="immersion-prompt">📝 What does your memo read?</p>
      <div class="scramble-instructions">🧩 Drag the lines into the correct order:</div>
      <div id="scramble-words"></div>
      <div id="scramble-feedback"></div>
    `;
    const sentence = [
      "while the asking price",
      "is above our threshold",
      "the strategic location",
      "may warrant",
      "an exception"
    ];
    const scrambled = shuffleArray(sentence);
    const containerEl = document.getElementById("scramble-words");
    scrambled.forEach(line => {
      const el = document.createElement("span");
      el.className = "scramble-word";
      el.textContent = line;
      containerEl.appendChild(el);
    });
    Sortable.create(containerEl, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(sentence, "scene3A1");
    document.getElementById("sentence-scramble").appendChild(checkBtn);
  }
},

"scene2B": {
  render: function(container) {
    container.innerHTML = `
      <p class="immersion-prompt">📝 What does your memo read?</p>
      <div class="scramble-instructions">🧩 Drag the lines into the correct order:</div>
      <div id="scramble-words"></div>
      <div id="scramble-feedback"></div>
    `;
    const sentence = [
      "due to current valuation concerns",
      "I suggest we hold off on Chamartín",
      "and review alternative listings today"
    ];
    const scrambled = shuffleArray(sentence);
    const containerEl = document.getElementById("scramble-words");
    scrambled.forEach(line => {
      const el = document.createElement("span");
      el.className = "scramble-word";
      el.textContent = line;
      containerEl.appendChild(el);
    });
    Sortable.create(containerEl, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(sentence, "scene3A2");
    document.getElementById("sentence-scramble").appendChild(checkBtn);
  }
},

 

  "scene3A1": {
    render: function(container) {
      container.innerHTML =

       `
        <div class="email-box">
          <p><strong>Email from Marta – Financial Controller</strong></p>
          <p>Hi Alan,<br><br>
          Thank you for your detailed memo. After reviewing it carefully, I see the strategic merit in the location despite the price premium.<br><br>
          However, the board remains cautious given upcoming cash flow constraints.<br><br>
          To move forward, please negotiate with the seller for at least a 5% price reduction.<br><br>
          Let me know if you need support with this.<br><br>
          Best,<br>Marta</p>
        </div>
        <div class="decision-buttons">
          <button onclick="loadScene('scene3A1challenge')">Negotiate immediately</button>
          <button onclick="loadScene('scene3A1support')">Request support before negotiating</button>
        </div>
      `;
    }
  },

  "scene3A1challenge": {
    scramble: [
      "I", "reaching", "am", "out", "regarding", "the", "Chamartín", "property", "to", "discuss", "the", "asking", "price", "and", "explore", "possible", "adjustments"
    ],
    correct: [
      "I", "am", "reaching", "out", "regarding", "the", "Chamartín", "property", "to", "discuss", "the", "asking", "price", "and", "explore", "possible", "adjustments"
    ],
    next: "scene4A1"
  },

  "scene3A1support": {
    scramble: [
      "Chamartín", "I", "would", "it", "if", "you", "please", "with", "the", "assist", "negotiation", "regarding", "could", "the", "appreciate", "deal"
    ],
    correct: [
      "I", "would", "appreciate", "it", "if", "you", "could", "please", "assist", "with", "the", "negotiation", "regarding", "the", "Chamartín", "deal"
    ],
    next: "scene4A2"
  },

  "scene3A2": {
    render: function(container) {
      container.innerHTML = `
        <div class="chat-message">💬 Javier: “That Tetuán lot just popped up. Weird listing. Could be gold, could be contaminated. Want me to dig?”</div>
        <div class="decision-buttons">
          <button onclick="loadScene('scene3A2optionA')">Greenlight the Research Team</button>
          <button onclick="loadScene('scene3A2optionB')">Call the Seller Directly</button>
        </div>
      `;
    }
  },

  "scene3A2optionA": {
    scramble: [
      "we", "should", "initiate", "a", "review", "of", "the", "zoning", "and", "ownership", "records", 
    ],
    correct: [
      "we", "should", "initiate", "a", "review", "of", "the", "zoning", "and", "ownership", "records", 
    ],
    next: "scene4B1"
  },

  "scene3A2optionB": {
    scramble: [
      "I", "would", "appreciate", "confirmation", "on", "whether", "the", "site", "has", "been", "cleared", "of", "prior", "contamination"
    ],
    correct: [
      "I", "would", "appreciate", "confirmation", "on", "whether", "the", "site", "has", "been", "cleared", "of", "prior", "contamination"
    ],
    next: "scene4B2"
  },

  "scene4A1": {
    scramble: [
      "Dear (seller's name),",
      "Hope you have been well.",
      "I am reaching out regarding the Chamartín property to discuss the asking price and explore possible adjustments.",
      "If you were to agree to a 5% discount over the asking price, our company could move ahead with the operation.",
      "Please reach out to me should you require any further assistance.",
      "I remain at your disposal.",
      "Best regards,",
      "Alan"
    ],
    correct: [
      "Dear (seller's name),",
      "Hope you have been well.",
      "I am reaching out regarding the Chamartín property to discuss the asking price and explore possible adjustments.",
      "If you were to agree to a 5% discount over the asking price, our company could move ahead with the operation.",
      "Please reach out to me should you require any further assistance.",
      "I remain at your disposal.",
      "Best regards,",
      "Alan"
    ],
    next: "scene5A1"
  },

  "scene4A2": {
    scramble: [
      "Dear Marta,",
      "I would appreciate it if you could please assist with the negotiation regarding the Chamartín deal.",
      "Please let me know if you need further details.",
      "Thank you for your attention. I look forward to your support.",
      "Best regards,",
      "Alan"
    ],
    correct: [
      "Dear Marta,",
      "I would appreciate it if you could please assist with the negotiation regarding the Chamartín deal.",
      "Please let me know if you need further details.",
      "Thank you for your attention. I look forward to your support.",
      "Best regards,",
      "Alan"
    ],
    next: "scene5A2"
  },
"scene4B1": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Email from Javier Morales</strong></p>
        <p>Hey Alan,<br><br>
        Just finished the preliminary sweep on that Tetuán lot. No active contamination listed in the regional database.<br><br>
        The less good news is the ownership: the trust managing the plot includes multiple family stakeholders, and their internal documents haven’t been updated in over a year.<br><br>
        There’s also a historical dispute tied to a nearby lot — not a dealbreaker, but something to flag early.<br><br>
        Let me know if you want a deeper dive.<br><br>
        — Javier</p>
      </div>
      <div class="chat-message">💬 Javier: "Legal might want eyes on this if you're still interested."</div>
      <div class="decision-buttons">
        <button onclick="loadScene('scene4B1A')">Ask Legal to investigate further</button>
        <button onclick="loadScene('scene4B1B')">Pause and monitor listing</button>
      </div>
    `;
  }
},

"scene4B1A": {
  scramble: [
    "Given the dispute,",
    "we should loop in Legal",
    "for clarity",
    "and conduct further checks"
  ],
  correct: [
    "Given the dispute,",
    "we should loop in Legal",
    "for clarity",
    "and conduct further checks"
  ],
  next: "scene5B1"
},

"scene4B1B": {
  scramble: [
    "Please monitor the listing activity,",
    "Research,",
    "and keep me posted"
  ],
  correct: [
    "Please monitor the listing activity,",
    "Research,",
    "and keep me posted"
  ],
  next: "scene5B2"
},"scene4B2": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Voicemail from Isabel Hernández,a member of the family trust</strong></p>
      
        <audio controls>
          <source src="audio/voicemail_scene4B2.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div class="scramble-instructions">🧩 Drag the lines into the correct order:</div>
      <div id="scramble-words"></div>
      <div id="scramble-feedback"></div>
    `;

    const sentence = [
      "Thank you for your time.",
      "I would be grateful if you could share any updated documentation regarding the site for review.",
      "Please feel free to reach out if you have any questions.",
      "I remain at your disposal."
    ];

    const scrambled = shuffleArray(sentence);
    const scrambleContainer = document.getElementById("scramble-words");
    scrambled.forEach(line => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = line;
      scrambleContainer.appendChild(span);
    });

    Sortable.create(scrambleContainer, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(sentence, "scene5B2");
    scrambleContainer.parentNode.appendChild(checkBtn);
  }
},
"scene5A1": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Voicemail from Seller</strong></p>
        <audio controls>
          <source src="audio/voicemail_scene5A1.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
       
      <div class="chat-message">💬 Marta: "Can you confirm the timeline for the revised proposal?"</div>
      <div class="decision-buttons">
        <button onclick="loadScene('scene5A1challenge')">Reply to voicemail</button>
      </div>
    `;
  }
},
"scene5A1challenge": {
  scramble: [
    "Thank you for your time.",
    "We are happy to revise our offer based on your feedback.",
    "I’ll send the revised proposal this afternoon."
  ],
  correct: [
    "Thank you for your time.",
    "We are happy to revise our offer based on your feedback.",
    "I’ll send the revised proposal this afternoon."
  ],
  next: "scene6A"
},
"scene5A2": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Voicemail from Marta</strong></p>
        <p><em>“Hi Alan. I can support you with the negotiation. Let’s aim for a confident tone but leave some room to pivot. If you're free around 3 p.m., I can join the call. I’ll also forward you a template for the revised terms.”</em></p>
        <audio controls>
          <source src="audio/voicemail_scene5A2.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div class="scramble-instructions">🧩 Drag the lines into the correct order:</div>
      <div id="scramble-words"></div>
      <div id="scramble-feedback"></div>
    `;

    const sentence = [
      "Thank you for the offer to support.",
      "3 p.m. works for me and I appreciate the template.",
      "Let’s move forward together."
       
   

    ];

    const shuffled = shuffleArray(sentence);
    const containerDiv = document.getElementById("scramble-words");
    shuffled.forEach(line => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = line;
      containerDiv.appendChild(span);
    });

    Sortable.create(containerDiv, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = function () {
      const userAnswer = Array.from(containerDiv.children).map(el => el.textContent.trim());
      const feedback = document.getElementById("scramble-feedback");
      if (arraysEqual(userAnswer, sentence)) {
        feedback.textContent = "✅ Correct! Moving on...";
        feedback.style.color = "green";
        setTimeout(() => loadScene6("scene6A"), 1000);
      } else {
        feedback.textContent = "❌ Not quite. Try again.";
        feedback.style.color = "red";
      }
    };
    containerDiv.parentElement.appendChild(checkBtn);
  },
  next: "scene6A"
},"scene5B1": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Email from Legal (Teresa Palau)</strong></p>
        <p>Alan,<br><br>
        We’ve reviewed the documents tied to the Tetuán lot. The dispute noted by Javier appears to involve right-of-way access to the southern edge.<br><br>
        If that section is non-essential for your plans, the issue may be manageable.<br><br>
        We recommend including a conditional clause in any draft agreement that protects us if litigation arises. Let me know how you'd like to proceed.</p>
      </div>
      <div id="sentence-scramble"></div>
      <div id="scramble-feedback"></div>
    `;

    const scrambleDiv = document.getElementById("sentence-scramble");
    const sentence = [
      "Thank you for the clarity.",
      "Please prepare a conditional clause",
      "and share it before the end of the day."
    ];

    const correct = [...sentence];
    const shuffled = shuffleArray(sentence);

    const instruction = document.createElement("p");
    instruction.className = "scramble-instructions";
    instruction.innerText = "🧙‍ Drag the lines into the correct order:";
    scrambleDiv.appendChild(instruction);

    const scrambleContainer = document.createElement("div");
    scrambleContainer.id = "scramble-words";

    shuffled.forEach(line => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = line;
      scrambleContainer.appendChild(span);
    });

    scrambleDiv.appendChild(scrambleContainer);
    Sortable.create(scrambleContainer, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(correct, "scene6B");
    scrambleDiv.appendChild(checkBtn);
  },
  next: "scene6B"
},"scene5B2": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-box">
        <p><strong>Email from Javier</strong></p>
        <p>Will do. I’ll keep an eye on the listing activity and notify you if there are any changes — new documents, new bidders, or sudden price movements.</p>
      </div>
      <div id="sentence-scramble">
        <p class="scramble-instructions">🧩 Drag the lines into the correct order:</p>
        <div id="scramble-words"></div>
        <div id="scramble-feedback"></div>
      </div>
    `;

    const sentence = [
      "Thanks for the heads up.",
      "Please keep tracking",
      "and let me know of any updates."
    ];

    const correct = [...sentence];
    const shuffled = shuffleArray(sentence);

    const containerEl = document.getElementById("scramble-words");
    shuffled.forEach(line => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = line;
      containerEl.appendChild(span);
    });

    Sortable.create(containerEl, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(correct, "scene6B");
    document.getElementById("sentence-scramble").appendChild(checkBtn);
  }
},"scene7A": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-block">
        <p><strong>From:</strong> Marta Cebrián &lt;marta@statecorp.com&gt;<br>
        <strong>To:</strong> <input type="email" id="emailA_to" value="xavier.benitz@gmail.com"></p>

        <p><strong>Subject:</strong> <input type="text" id="emailA_subject" value="A-STATE / Final Memo / Alan"></p>

        <p>Alan,</p>
        <p>Great work. The final terms were well received. We’ve now cleared the acquisition with Legal and the seller has signed.<br>
        This will count toward your quarterly targets. Congrats — I’ve looped you into next week’s strategy roundtable as well.</p>

        <hr>
        <h3>Assignment — Follow-Up Memo</h3>
        <p>Write a formal summary (100–120 words) explaining how you approached the negotiation tactfully and what made the deal go through.</p>

        <label for="emailA_body">Message:</label><br>
        <textarea id="emailA_body" rows="8" cols="60" placeholder="Type your memo here..."></textarea><br><br>

        <button id="sendEmailBtnA">Send Email</button>
        <div id="sendStatusA" style="margin-top: 10px; font-weight: bold;"></div>
      </div>
    `;

    document.getElementById("sendEmailBtnA").addEventListener("click", () => {
      const to = document.getElementById("emailA_to").value || "xavier.benitz@gmail.com";
      const subject = document.getElementById("emailA_subject").value || "A-STATE / Final Memo / Alan";
      const body = document.getElementById("emailA_body").value || "";

      const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      document.getElementById("sendStatusA").textContent = "✉️ Your email client should open shortly.";
    });
  }
},

"scene7B": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-block">
        <p><strong>From:</strong> Marta Cebrián &lt;marta@statecorp.com&gt;<br>
        <strong>To:</strong> <input type="email" id="emailB_to" value="xavier.benitz@gmail.com"></p>

        <p><strong>Subject:</strong> <input type="text" id="emailB_subject" value="A-STATE / Conditional Clause Note / Alan"></p>

        <p>Alan,</p>
        <p>The meeting was productive. No firm agreement yet, but we’ve got a soft commitment. Legal has flagged one clause that may delay signing.<br>
        Please revise the draft accordingly. Let’s aim to finalise this by Friday.</p>

        <hr>
        <h3>Assignment — Clarification Note</h3>
        <p>Write a short clarification (60–80 words) about what clause caused delay and how you plan to resolve it.</p>

        <label for="emailB_body">Message:</label><br>
        <textarea id="emailB_body" rows="8" cols="60" placeholder="Type your clarification note here..."></textarea><br><br>

        <button id="sendEmailBtnB">Send Email</button>
        <div id="sendStatusB" style="margin-top: 10px; font-weight: bold;"></div>
      </div>
    `;

    document.getElementById("sendEmailBtnB").addEventListener("click", () => {
      const to = document.getElementById("emailB_to").value || "xavier.benitz@gmail.com";
      const subject = document.getElementById("emailB_subject").value || "A-STATE / Conditional Clause Note / Alan";
      const body = document.getElementById("emailB_body").value || "";

      const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      document.getElementById("sendStatusB").textContent = "✉️ Your email client should open shortly.";
    });
  }
},

"scene7C": {
  render: function(container) {
    container.innerHTML = `
      <div class="email-block">
        <p><strong>From:</strong> Marta Cebrián &lt;marta@statecorp.com&gt;<br>
        <strong>To:</strong> <input type="email" id="emailC_to" value="xavier.benitz@gmail.com"></p>

        <p><strong>Subject:</strong> <input type="text" id="emailC_subject" value="A-STATE / Missed Deal Reflection / Alan"></p>

        <p>Alan,</p>
        <p>Unfortunately, the seller was not comfortable with the structure we proposed. Given the tone of the discussion, I believe we’ve lost the momentum on this one.<br>
        Thanks for the effort — let’s regroup next week and look ahead.</p>

        <hr>
        <h3>Assignment — Postmortem Email</h3>
        <p>Write a postmortem (80–100 words) identifying one strength and one weakness in your approach. What would you do differently next time?</p>

        <label for="emailC_body">Message:</label><br>
        <textarea id="emailC_body" rows="8" cols="60" placeholder="Type your reflection here..."></textarea><br><br>

        <button id="sendEmailBtnC">Send Email</button>
        <div id="sendStatusC" style="margin-top: 10px; font-weight: bold;"></div>
      </div>
    `;

    document.getElementById("sendEmailBtnC").addEventListener("click", () => {
      const to = document.getElementById("emailC_to").value || "xavier.benitz@gmail.com";
      const subject = document.getElementById("emailC_subject").value || "A-STATE / Missed Deal Reflection / Alan";
      const body = document.getElementById("emailC_body").value || "";

      const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      document.getElementById("sendStatusC").textContent = "✉️ Your email client should open shortly.";
    });
  }
}





  
 









};





// Game start setup
let currentSceneId = "scene1";

function startGame() {
  document.getElementById("overlay-content").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  loadScene(currentSceneId);
}

// Add missing logic for rendering and sentence checking
function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

function loadScene(id) {
  const scene = scenes[id];
  if (!scene) return;

  const imageDiv = document.getElementById("scene-image");
  const textDiv = document.getElementById("scene-text");
  const scrambleDiv = document.getElementById("sentence-scramble");
  const feedbackDiv = document.getElementById("scramble-feedback");

  imageDiv.innerHTML = "";
  textDiv.innerHTML = "";
  scrambleDiv.innerHTML = "";
  feedbackDiv.innerText = "";

  if (scene.render) {
    scene.render(textDiv);
    return;
  }

  if (scene.image) {
    imageDiv.innerHTML = `<img src="${scene.image}" alt="Scene Image" />`;
  }

  if (scene.text) {
    const textPara = document.createElement("p");
    textPara.innerText = scene.text;
    textDiv.appendChild(textPara);
  }

  if (scene.scramble) {
    
    const instruction = document.createElement("p");
    instruction.className = "scramble-instructions";
    instruction.innerText = "🧩 Drag the lines into the correct order:";
    scrambleDiv.appendChild(instruction);
    

    const scrambleContainer = document.createElement("div");
    scrambleContainer.id = "scramble-words";

    const shuffled = shuffleArray(scene.scramble);
    shuffled.forEach(line => {
      const span = document.createElement("span");
      span.className = "scramble-word";
      span.textContent = line;
      scrambleContainer.appendChild(span);
    });

    scrambleDiv.appendChild(scrambleContainer);
    Sortable.create(scrambleContainer, { animation: 150 });

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "Check Answer";
    checkBtn.onclick = () => checkScrambleAnswer(scene.correct, scene.next);
    scrambleDiv.appendChild(checkBtn);
  }
}

function checkScrambleAnswer(correctOrder, nextSceneId) {
  const words = Array.from(document.querySelectorAll("#scramble-words .scramble-word"));
  const userOrder = words.map(w => w.textContent.trim());
  const feedback = document.getElementById("scramble-feedback");

  if (arraysEqual(userOrder, correctOrder)) {
    feedback.textContent = "✅ Correct! Moving on...";
    feedback.style.color = "lightgreen";

    setTimeout(() => {
      if (nextSceneId.startsWith("scene6")) {
        loadScene6(nextSceneId); // 🔁 use special loader for Scene 6
      } else {
        loadScene(nextSceneId); // regular loader
      }
    }, 1000);

  } else {
    feedback.textContent = "❌ Not quite. Try again.";
    feedback.style.color = "salmon";
  }
}

const scene6Data = {
  scene6A: {
    title: "Scene 6A — Chamartín Deal Negotiation",
    interactions: [
      {
        audio: "audio/scene6A_1.mp3",
        options: [
          { text: "I'm afraid my company requires a price cut.", score: 0 },
          { text: "If you can offer even a modest concession, we’re prepared to move quickly.", score: 1 },
          { text: "I was hoping to hear what you had in mind.", score: 0 }
        ]
      },
      {
        audio: "audio/scene6A_2.mp3",
        options: [
          { text: "If we align today, I can get internal approval within 48 hours.", score: 1 },
          { text: "That would depend on what else comes up.", score: 0 },
          { text: "We might be able to do it within the week.", score: 0 }
        ]
      },
      {
        audio: "audio/scene6A_3.mp3",
        options: [
          { text: "I'm sorry but that is off the table.", score: 0 },
          { text: "If your terms align with our standards, we can work with that.", score: 1 },
          { text: "I believe I would require input from our financial controller.", score: 0 }
        ]
      }
    ],
    endings: {
      high: "scene7A",
      medium: "scene7B",
      low: "scene7C"
    }
  },

  scene6B: {
    title: "Scene 6B — Tetuán Deal Negotiation",
    interactions: [
      {
        audio: "audio/scene6B_1.mp3",
        options: [
          { text: "I'm sorry but we must require documents.", score: 0 },
          { text: "If we can proceed with conditions, I’m open.", score: 1 },
          { text: "That would depend on the state of your paperwork.", score: 0 }
        ]
      },
      {
        audio: "audio/scene6B_2.mp3",
        options: [
          { text: "Please ensure one lead contact — or I'm afraid we won't be able to proceed.", score: 0 },
          { text: "Five? That may make things complicated.", score: 1 },
          { text: "I believe we can take our chances.", score: 0 }
        ]
      },
      {
        audio: "audio/scene6B_3.mp3",
        options: [
          { text: "You should know we’re also reviewing other leads.", score: 0 },
          { text: "If our teams align, I can follow up today.", score: 1 },
          { text: "I'm afraid I need time to think.", score: 0 }
        ]
      }
    ],
    endings: {
      high: "scene7A",
      medium: "scene7B",
      low: "scene7C"
    }
  }
};



function loadScene6(id) {
  const scene = scene6Data[id];
  if (!scene) {
    console.error(`Scene data not found for ID: ${id}`);
    return;
  }

  const gameContainer = document.getElementById("game-container");
  const sceneText = document.getElementById("scene-text");
  const sceneImage = document.getElementById("scene-image");
  const scramble = document.getElementById("sentence-scramble");
  const feedback = document.getElementById("scramble-feedback");
  const scene6UI = document.getElementById("scene6-ui");

  // Show game container and Scene 6 UI container
  gameContainer.style.display = "block";

  // Hide Scene 7 UI containers during Scene 6
  sceneText.style.display = "none";
  sceneImage.style.display = "none";
  scramble.style.display = "none";
  feedback.style.display = "none";

  // Clear Scene 6 UI container and add Scene 6 HTML
  scene6UI.innerHTML = `
    <h2>Negotiation</h2>
    <p>🎙️ Listen carefully. Press play when ready. Once the audio ends, you’ll have <strong>30 seconds</strong> to choose your reply.</p>
    <div id="interaction"></div>
  `;

  let score = 0;
  let index = 0;

  function showInteraction() {
    if (index >= scene.interactions.length) {
      const ending =
        score >= 3 ? scene.endings.high :
        score === 2 ? scene.endings.medium :
        scene.endings.low;

      // Show Scene 7 UI containers inside gameContainer
      sceneText.style.display = "block";
      sceneImage.style.display = "block";
      scramble.style.display = "block";
      feedback.style.display = "block";

      // Clear Scene 6 UI container
      scene6UI.innerHTML = "";

      // Load Scene 7 content
      loadScene(ending);
      return;
    }

    const interaction = scene.interactions[index];
    const interactionDiv = document.getElementById("interaction");
    interactionDiv.innerHTML = `
      <audio id="interaction-audio" controls>
        <source src="${interaction.audio}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <div id="timer">⏳ Waiting for audio to finish...</div>
      <div id="options" style="margin-top: 10px;"></div>
      <div id="feedback" style="margin-top: 10px;"></div>
    `;

    const audio = document.getElementById("interaction-audio");
    audio.onended = () => {
      let timeLeft = 30;
      const timerEl = document.getElementById("timer");
      timerEl.textContent = `⏳ ${timeLeft} seconds remaining...`;

      const countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏳ ${timeLeft} seconds remaining...`;
        if (timeLeft <= 0) {
          clearInterval(countdown);
          document.getElementById("feedback").textContent = "⌛ Time expired. No reply sent.";
          index++;
          setTimeout(showInteraction, 2000);
        }
      }, 1000);

      const optionsDiv = document.getElementById("options");
      optionsDiv.innerHTML = "";

      interaction.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = typeof opt === "string" ? opt : opt.text;
        btn.onclick = () => {
          clearInterval(countdown);
          const isCorrect = (typeof opt === "string") ? (i === interaction.correct) : (opt.score === 1);
          if (isCorrect) {
            score++;
            document.getElementById("feedback").textContent = "✅ Response recorded.";
            document.getElementById("feedback").style.color = "lightgreen";
          } else {
            document.getElementById("feedback").textContent = "⚠️ Response recorded.";
            document.getElementById("feedback").style.color = "orange";
          }
          index++;
          setTimeout(showInteraction, 1500);
        };
        optionsDiv.appendChild(btn);
      });
    };
  }

  showInteraction();
}





