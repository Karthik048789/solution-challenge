# BiasX-Ray Demo Script & Presentation Guide

To grab the attention of judges, your demo should focus on the **"Magic Moment"**: when the AI identifies a hidden bias and immediately suggests a way to fix it. This script is designed for a **3-5 minute presentation**.

---

## Part 1: The Hook (30 Seconds)
**Visual: Home Page (Hero Section)**
*   **Speaker:** "We all know AI is making life-altering decisions—who gets a loan, who gets hired, who gets insurance. But there's a hidden problem: AI models often inherit historical biases that we can't see... until it's too late."
*   **Action:** Scroll slightly through the Hero section to show the high-end visuals and the "AI Fairness Auditing Platform" badge.
*   **Speaker:** "Introducing **BiasX-Ray**. We don't just find bias; we provide the medical-grade X-ray and the prescription to fix it."

---

## Part 2: The Ingestion (45 Seconds)
**Visual: Upload Page**
*   **Speaker:** "Let's put a real-world dataset under the X-ray."
*   **Action:** Drag and drop `sample_loan_data.csv`. 
*   **Speaker:** "Most tools require complex coding. With BiasX-Ray, you just drop your data. Our engine immediately analyzes categorical features—gender, region, education—to identify protected groups."
*   **Action:** Click **"Upload and Run Scan"**.
*   **Speaker:** "In seconds, we've moved from raw data to actionable intelligence."

---

## Part 3: The Dashboard - "The Diagnosis" (1 Minute)
**Visual: Dashboard Page**
*   **Speaker:** "Welcome to the Bias Dashboard. Here is the pulse of your model's integrity."
*   **Action:** Point to the **Fairness Score (e.g., 77.03%)**.
*   **Speaker:** "Our Fairness Score isn't just an approval rate; it's a weighted equity metric. It tells you exactly how balanced your model's outcomes are across all subgroups."
*   **Action:** Scroll down to the **Audited Group Rankings** table.
*   **Speaker:** "Look here—our engine automatically flagged a 'High Risk' group. In this case, 'Gender=Female' and 'Region=Rural' are seeing a significant approval gap compared to the baseline."

---

## Part 4: AI Insights - "The Magic Moment" (1 Minute)
**Visual: AI Insights Panel (Right Side of Dashboard)**
*   **Speaker:** "Finding bias is step one. Step two is understanding *why* it's happening and how to fix it."
*   **Action:** Click on the high-risk group in the table, then click the **"Generate Explanation"** button (Sparkles icon).
*   **Speaker:** "This is where our **Agentic AI Engine** takes over. It analyzes the disparity and generates a transparent report."
*   **Visual:** Wait for the AI text to appear.
*   **Speaker:** "The AI has identified that the model is over-weighting a specific proxy variable. It doesn't just complain; it gives us **three concrete recommendations**—from re-weighting the training data to applying an adversarial debiasing layer."

---

## Part 5: The Closing (30 Seconds)
**Visual: Dashboard KPI Cards**
*   **Speaker:** "BiasX-Ray transforms 'Responsible AI' from a vague concept into a real-time engineering metric. We help teams ship models that aren't just accurate, but fundamentally fair."
*   **Speaker:** "Thank you. Any questions on how we’re X-raying the future of AI?"

---

## What You Should Show (Judge's Checklist)

1.  **The 3D Visuals:** Judges love polish. The **Three.js background** and **KPICard3D** animations make the project feel premium and "production-ready."
2.  **The "Gap" Fix:** Make sure to mention that the **NaN% bug** was fixed and you're now showing real-time disparity calculations.
3.  **Cross-Subgroup Analysis:** Highlight that the tool doesn't just look at "Gender" or "Race" in isolation, but finds complex "Pair Combinations" (e.g., *Female + Rural*) which are often where the most insidious biases hide.
4.  **Actionable Remediation:** Emphasize that the AI doesn't just give a score; it gives **recommendations**. This moves the tool from a "monitor" to a "solution."

## Pro Tips for the Demo
*   **Use Fullscreen:** Press `F11` in the browser to make the dashboard look like a standalone application.
*   **Refresh Strategy:** If you're doing a live demo, show the **"Sync Data"** button to demonstrate that the system is alive and reacting to backend changes.
*   **The "Why":** If asked why the Fairness Score differs from Approval Rate, use the explanation we discussed: *"It's a measure of equity (parity), not a measure of success. A high-approval model can still be highly unfair."*
