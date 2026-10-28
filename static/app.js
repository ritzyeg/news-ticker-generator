// Test cases 
const MANORAMA_SAMPLE_1 = `ചേരാനല്ലൂർ അപകടം – ജയബാലകൃഷ്ണന്റെ മരണം
ചേരാനല്ലൂരിൽ വാഹനമിടിച്ച് കടയുടമ മരിച്ച കേസിൽ പ്രതിയായ 17കാരന്റെ അച്ഛനായ ജഡ്ജിക്കെതിരെ നടപടി ശുപാർശ. ജഡ്ജിയെ സസ്പെൻഡ് ചെയ്യണമെന്ന് ആവശ്യപ്പെട്ട് പോർട്ട്‌ഫോളിയോ ജഡ്ജി ജസ്റ്റിസ് പി.വി. കുഞ്ഞികൃഷ്ണൻ ഹൈക്കോടതി ചീഫ് ജസ്റ്റിസിന് റിപ്പോർട്ട് നൽകി. ജഡ്ജി പൊലീസ് സ്റ്റേഷനിൽ എത്തിയ നടപടി ശരിയായില്ലെന്നും ഇതു നീതിന്യായ വ്യവസ്ഥയ്ക്ക് അവമതിപ്പുണ്ടാക്കിയെന്നും റിപ്പോർട്ടിൽ പരാമർശം.
ഞായറാഴ്ച പുലർച്ചെയാണ് ചേരാനല്ലൂർ കണ്ടെയ്‌നർ റോഡിൽ അപകടം ഉണ്ടായത്. ചിറ്റൂർ സ്വദേശി ജയബാലകൃഷ്ണൻ (55) ആണ് മരിച്ചത്. കട അടച്ച് സ്കൂട്ടറിൽ വീട്ടിലേക്ക് പോകുകയായിരുന്നു. ഈ സമയത്ത് പിന്നിൽനിന്ന് എത്തിയ മെഴ്‌സിഡസ് ബെൻസ് കാർ സ്കൂട്ടറിൽ ഇടിച്ചു. ജയബാലകൃഷ്ണൻ സംഭവസ്ഥലത്ത് മരിച്ചു. കാർ അമിതവേഗത്തിലായിരുന്നുവെന്നാണ് പ്രാഥമിക വിവരം. മണിക്കൂറിൽ 100 കിലോമീറ്ററിലധികം വേഗമുണ്ടായിരുന്നതായും സൂചന.
കാർ ഓടിച്ചത് ജഡ്ജിയുടെ 17കാരനായ മകനാണെന്നാണ് കേസ്. കാർ ഉടമയായ ജഡ്ജിക്കെതിരെയും കേസെടുത്തിട്ടുണ്ട്. പ്രായപൂർത്തിയാകാത്ത മകനെ വാഹനം ഓടിക്കാൻ അനുവദിച്ചതിന് മോട്ടോർ വാഹന നിയമത്തിലെ 199എ വകുപ്പ് പ്രകാരമാണ് കേസ്.`;

const MANORAMA_SAMPLE_2 = `വടക്കേ ഇന്ത്യയിൽ മഴ മുന്നറിയിപ്പ്
ബംഗാൾ ഉൾക്കടലിൽ രൂപപ്പെടുന്ന കാലാവസ്ഥാ സംവിധാനം കാരണം അടുത്ത ദിവസങ്ങളിൽ വടക്കേ ഇന്ത്യയിലും മഴയ്ക്ക് സാധ്യതയെന്ന് കാലാവസ്ഥാ വകുപ്പ്. ആദ്യം ആന്ധ്ര, ഒഡീഷ തീരങ്ങളിൽ ശക്തമായ മഴയ്ക്ക് സാധ്യത.
ആന്ധ്രയിൽ വിശാഖപട്ടണം, കാക്കിനഡ ഭാഗങ്ങളിൽ ഒക്ടോബർ 27, 28 തീയതികളിൽ കനത്ത മഴയ്ക്ക് സാധ്യത. തീരപ്രദേശങ്ങളിൽ ശക്തമായ കാറ്റിനും സാധ്യതയുണ്ട്. മത്സ്യത്തൊഴിലാളികൾ കടലിൽ പോകരുതെന്ന് മുന്നറിയിപ്പ്. ഒഡീഷയിലും മഴ മുന്നറിയിപ്പുണ്ട്. ഗഞ്ചാം, ഗജപതി, രായഗഡ ജില്ലകളിൽ ജാഗ്രത നിർദേശം.`;

let rundown = [];

function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
}

document.addEventListener("DOMContentLoaded", () => {
    const rawInput = document.getElementById("raw-news-input");
    const rundownContainer = document.getElementById("rundown-list");
    const marqueeContent = document.getElementById("marquee-content");

    // 1. Load Manorama Sample Texts
    document.getElementById("btn-load-manorama").addEventListener("click", () => {
        rawInput.value = `${MANORAMA_SAMPLE_1}\n\n---\n\n${MANORAMA_SAMPLE_2}`;
    });

    // 2. Clear input
    document.getElementById("btn-clear").addEventListener("click", () => {
        rawInput.value = "";
    });

    // 3. Generate Tickers
    document.getElementById("btn-generate").addEventListener("click", async () => {
        const text = rawInput.value.trim();
        if (!text) {
            alert("ദയവായി വാർത്തകൾ നൽകുക!");
            return;
        }

        const articles = text.split("---")
            .map((t, idx) => ({ id: idx + 1, text: t.trim() }))
            .filter(a => a.text.length > 0);

        const selectedLang = document.querySelector('input[name="lang"]:checked').value;

        rundownContainer.innerHTML = "<div style='color:#38bdf8; padding:1.5rem; text-align:center;'>⏳ ടിക്കറുകൾ തയ്യാറാക്കുന്നു... കാത്തിരിക്കുക.</div>";

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ articles, language: selectedLang })
            });
            const data = await res.json();
            if (data.success) {
                rundown = data.data;
                renderRundown();
            } else {
                rundownContainer.innerHTML = "<div style='color:#ef4444;'>ജനറേഷൻ പരാജയപ്പെട്ടു.</div>";
            }
        } catch (e) {
            console.error(e);
            rundownContainer.innerHTML = "<div style='color:#ef4444;'>സെർവറുമായി ബന്ധപ്പെടാൻ സാധിച്ചില്ല. python app.py റൺ ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക.</div>";
        }
    });

    // Render Editorial Rundown Cards
    function renderRundown() {
        if (!rundown || rundown.length === 0) {
            rundownContainer.innerHTML = "<div class='empty-state'>വാർത്തകൾ ജനറേറ്റ് ചെയ്ത ശേഷം ഇവിടെ കാണാം.</div>";
            updateMarquee();
            return;
        }

        rundownContainer.innerHTML = "";//old cards remove

        rundown.forEach((item, index) => {
            const wordCount = countWords(item.ticker);
            const badgeClass = wordCount <= 9 ? "badge-ok" : (wordCount === 10 ? "badge-warn" : "badge-danger");

            const card = document.createElement("div");
            card.className = "rundown-item";
            card.innerHTML = `
                <div class="item-top">
                    <span style="font-size:0.75rem; color:#38bdf8; font-weight:bold;">#${index + 1} RUNDOWN ITEM</span>
                    <label style="font-size:0.8rem; cursor:pointer;">
                        <input type="checkbox" class="cb-approve" data-index="${index}" ${item.approved ? "checked" : ""}> ലൈവ് ബ്രോഡ്കാസ്റ്റ്
                    </label>
                </div>

                <div class="item-source">
                    <strong>Source Dispatch:</strong> ${escapeHtml(item.source.substring(0, 160))}...
                </div>

                <!-- Editable Ticker Input Box -->
                <input type="text" class="ticker-input" data-index="${index}" value="${escapeHtml(item.ticker)}" placeholder="ടിക്കർ ടൈപ്പ് ചെയ്യുക...">

                <div class="item-meta">
                    <span class="word-badge ${badgeClass}" id="badge-${index}">
                        ${wordCount} / 10 Words ${wordCount > 10 ? '⚠️ (പരിധി കവിഞ്ഞു!)' : ''}
                    </span>
                    <div class="item-actions">
                        <button class="btn-up" data-index="${index}" ${index === 0 ? "disabled" : ""}>▲ Up</button>
                        <button class="btn-down" data-index="${index}" ${index === rundown.length - 1 ? "disabled" : ""}>▼ Down</button>
                        <button class="btn-trim" data-index="${index}" title="10 വാക്കുകളിലേക്ക് ചുരുക്കുക">✂️ Trim to 10</button>
                        <button class="btn-revert" data-index="${index}">↺ Revert</button>
                    </div>
                </div>
            `;
            rundownContainer.appendChild(card);
        });

        attachCardEventListeners();
        updateMarquee();
    }

    // Attach dynamic listeners to inputs and buttons
    function attachCardEventListeners() {
        document.querySelectorAll(".ticker-input").forEach(input => {
            input.addEventListener("input", (e) => {
                const idx = parseInt(e.target.dataset.index);
                const newText = e.target.value;
                rundown[idx].ticker = newText;

                const count = countWords(newText);
                const badge = document.getElementById(`badge-${idx}`);
                if (badge) {
                    badge.textContent = `${count} / 10 Words ${count > 10 ? '⚠️ (പരിധി കവിഞ്ഞു!)' : ''}`;
                    badge.className = `word-badge ${count <= 9 ? "badge-ok" : (count === 10 ? "badge-warn" : "badge-danger")}`;
                }

                updateMarquee();
            });
        });

        // Checkbox toggle
        document.querySelectorAll(".cb-approve").forEach(cb => {
            cb.addEventListener("change", (e) => {
                const idx = parseInt(e.target.dataset.index);//tick mark
                rundown[idx].approved = e.target.checked;
                updateMarquee();
            });
        });

        // Up button
        document.querySelectorAll(".btn-up").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index);
                if (idx > 0) {
                    const temp = rundown[idx];
                    rundown[idx] = rundown[idx - 1];
                    rundown[idx - 1] = temp;
                    renderRundown();
                }
            });
        });

        // Down button
        document.querySelectorAll(".btn-down").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index);
                if (idx < rundown.length - 1) {
                    const temp = rundown[idx];
                    rundown[idx] = rundown[idx + 1];
                    rundown[idx + 1] = temp;
                    renderRundown();
                }
            });
        });

        // ✂️ Trim to 10 Words Button 
        document.querySelectorAll(".btn-trim").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index);
                const words = rundown[idx].ticker.trim().split(/\s+/).filter(Boolean);
                if (words.length > 10) {
                    rundown[idx].ticker = words.slice(0, 10).join(" ");
                    renderRundown();
                }
            });
        });

        // Revert button
        document.querySelectorAll(".btn-revert").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = parseInt(e.target.dataset.index);
                rundown[idx].ticker = rundown[idx].original_ticker;
                renderRundown();
            });
        });
    }

    // Update the live broadcast ticker ribbon
    function updateMarquee() {
        // 10 വാക്കിൽ താഴെയുള്ളതും അപ്രൂവ് ചെയ്തതുമായ ടിക്കറുകൾ മാത്രം ലൈവിലേക്ക് വിടുന്നു
        const validApproved = rundown.filter(r => 
            r.approved && 
            r.ticker && 
            r.ticker.trim().length > 0 && 
            countWords(r.ticker) <= 10
        );

        const countSpan = document.getElementById("approved-count");
        if (countSpan) countSpan.textContent = `Approved & Valid: ${validApproved.length}`;

        if (validApproved.length === 0) {
            marqueeContent.innerHTML = `<span style="color: #f87171; padding-left: 20px;">⚠️ ലൈവ് ബ്രോഡ്കാസ്റ്റിന് 10 വാക്കിൽ താഴെയുള്ള അപ്രൂവ് ചെയ്ത ടിക്കറുകൾ ലഭ്യമല്ല...</span>`;
            return;
        }

        const itemsHtml = validApproved.map(r => `
            <span style="display: inline-flex; align-items: center; margin: 0 10px;">
                <span style="background-color: #e11d48; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 3px; margin-right: 8px;">FLASH</span>
                <span style="color: #ffffff; font-weight: 700;">${escapeHtml(r.ticker)}</span>
            </span>
        `).join(`
            <span style="display: inline-flex; align-items: center; margin: 0 24px; color: #38bdf8; font-weight: 800; font-size: 0.85rem;">
                <span style="display: inline-block; width: 6px; height: 6px; background-color: #f59e0b; border-radius: 50%; margin: 0 8px;"></span>
                ◆ MM NEWS ◆
                <span style="display: inline-block; width: 6px; height: 6px; background-color: #f59e0b; border-radius: 50%; margin: 0 8px;"></span>
            </span>
        `);

        marqueeContent.innerHTML = itemsHtml + `
            <span style="display: inline-flex; align-items: center; margin: 0 24px; color: #38bdf8; font-weight: 800; font-size: 0.85rem;">
                <span style="display: inline-block; width: 6px; height: 6px; background-color: #f59e0b; border-radius: 50%; margin: 0 8px;"></span>
                ◆ MM NEWS ◆
                <span style="display: inline-block; width: 6px; height: 6px; background-color: #f59e0b; border-radius: 50%; margin: 0 8px;"></span>
            </span>
        `;
    }

    function escapeHtml(text) {
        if (!text) return "";
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    // Export JSON with Validation check
    document.getElementById("btn-export-json").addEventListener("click", () => {
        const approved = rundown.filter(r => r.approved);
        if (approved.length === 0) {
            alert("ഡൗൺലോഡ് ചെയ്യാൻ അപ്രൂവ് ചെയ്ത ടിക്കറുകൾ ഇല്ല!");
            return;
        }

        const invalid = approved.filter(r => countWords(r.ticker) > 10);
        if (invalid.length > 0) {
            alert("ശ്രദ്ധിക്കുക: ചില ടിക്കറുകൾ 10 വാക്കിൽ കൂടുതലാണ്! ദയവായി അവ 10 വാക്കിലേക്ക് ചുരുക്കുക (✂️ Trim ഉപയോഗിക്കാം).");
            return;
        }

        const blob = new Blob([JSON.stringify(approved, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "manorama_approved_tickers.json";
        a.click();
    });

    // Export CSV with Validation check
    document.getElementById("btn-export-csv").addEventListener("click", async () => {
        const approved = rundown.filter(r => r.approved);
        if (approved.length === 0) {
            alert("ഡൗൺലോഡ് ചെയ്യാൻ അപ്രൂവ് ചെയ്ത ടിക്കറുകൾ ഇല്ല!");
            return;
        }

        const invalid = approved.filter(r => countWords(r.ticker) > 10);
        if (invalid.length > 0) {
            alert("ശ്രദ്ധിക്കുക: ചില ടിക്കറുകൾ 10 വാക്കിൽ കൂടുതലാണ്! ദയവായി അവ 10 വാക്കിലേക്ക് ചുരുക്കുക (✂️ Trim ഉപയോഗിക്കാം).");
            return;
        }

        try {
            const res = await fetch("/api/export/csv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tickers: approved })
            });
            const blob = await res.blob();
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "manorama_rundown.csv";
            a.click();
        } catch (e) {
            console.error(e);
            alert("CSV എക്സ്പോർട്ട് പരാജയപ്പെട്ടു.");
        }
    });
});