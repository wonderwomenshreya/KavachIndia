// 1. Digital Arrest & Call Risk Calculator
function evaluateScam() {
    const checkboxes = document.querySelectorAll('.scam-trigger:checked');
    const resultBox = document.getElementById('quiz-result');
    let riskScore = 0;

    checkboxes.forEach((box) => {
        riskScore += parseInt(box.value);
    });

    resultBox.classList.remove('hidden', 'danger-alert', 'warning-alert', 'safe-alert');

    if (riskScore >= 40) {
        resultBox.classList.add('danger-alert');
        resultBox.innerHTML = `
            <h3>🚨 CRITICAL ALERT: 99% PROBABILITY OF DIGITAL ARREST SCAM</h3>
            <p style="margin-top:8px;"><strong>STOP IMMEDIATELY!</strong> You are speaking with cybercriminals, NOT Indian Police, CBI, or RBI.</p>
            <ul style="margin: 10px 0 10px 20px;">
                <li><strong>Disconnect the call right now</strong> and turn off your camera.</li>
                <li><strong>Do NOT transfer any money</strong> for "verification" or "bail."</li>
                <li>Call your family members immediately and dial <strong>1930</strong> to report the caller number.</li>
            </ul>
        `;
    } else if (riskScore > 0) {
        resultBox.classList.add('warning-alert');
        resultBox.innerHTML = `
            <h3>⚠️ HIGH SUSPICION: POTENTIAL IMPERSONATION FRAUD</h3>
            <p style="margin-top:8px;">Government officials never threaten arrest or demand urgent action over phone/video calls. Hang up and independently verify via official government websites.</p>
        `;
    } else {
        resultBox.classList.add('safe-alert');
        resultBox.innerHTML = `
            <h3>ℹ️ No Triggers Selected</h3>
            <p style="margin-top:8px;">Please select the options above that match your current situation, or paste a suspicious message in the scanner below.</p>
        `;
    }
}

// 2. Scam Message, Link & Fake Notice Scanner
function scanMessage() {
    const input = document.getElementById('scam-text-input').value.trim().toLowerCase();
    const resultBox = document.getElementById('scanner-result');

    if (!input) {
        alert("Please paste a message, notice text, or link first!");
        return;
    }

    // Real Indian cyber fraud keyword & pattern database
    const highRiskKeywords = [
        'digital arrest', 'cbi', 'narcotics', 'customs', 'parcel seized',
        'kyc update', 'kyc suspended', 'pan card update', 'account blocked',
        'trai', 'sim blocked', 'rbi clearance', 'arrest warrant',
        'electricity disconnected', 'challan', '.apk', 'bit.ly', 'tinyurl',
        'screen share', 'anydesk', 'teamviewer', 'rustdesk'
    ];

    let detectedFlags = [];

    highRiskKeywords.forEach((keyword) => {
        if (input.includes(keyword)) {
            detectedFlags.push(keyword.toUpperCase());
        }
    });

    // Check for suspicious non-gov URLs
    const hasLink = input.includes('http://') || input.includes('https://') || input.includes('www.');
    const isOfficialGov = input.includes('.gov.in') || input.includes('.nic.in');

    resultBox.classList.remove('hidden', 'danger-alert', 'warning-alert', 'safe-alert');

    if (detectedFlags.length > 0 || (hasLink && !isOfficialGov)) {
        resultBox.classList.add('danger-alert');
        resultBox.innerHTML = `
            <h3>🚨 FRAUD / PHISHING DETECTED</h3>
            <p style="margin-top:8px;"><strong>Red Flags Found:</strong> ${detectedFlags.length > 0 ? detectedFlags.join(', ') : 'Suspicious Unverified Link'}</p>
            <p style="margin-top:8px;"><strong>Why this is dangerous:</strong> Scammers use fake urgency (KYC block, parcel seizure, arrest warrant) and unofficial links to steal bank credentials or install spyware.</p>
            <p style="margin-top:8px;"><strong>Action:</strong> Do NOT click any link, do NOT download any file, and block the sender.</p>
        `;
    } else {
        resultBox.classList.add('safe-alert');
        resultBox.innerHTML = `
            <h3>✅ No Common Scam Keywords Detected</h3>
            <p style="margin-top:8px;">This text does not contain common Indian phishing phrases. However, never share OTPs, UPI PINs, or Aadhaar details with anyone.</p>
        `;
    }
}
