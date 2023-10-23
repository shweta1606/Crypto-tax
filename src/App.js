import React, { useState, useEffect } from 'react';
import './App.css';
function FAQSection({ faqData }) {
  return (
    <div className="faq-section">
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
           <div className="question">
          <h3>{item.question}</h3>
          </div>
          <div className="answer">
          <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const faqData = [
    {
      question: "How are cryptocurrencies taxed in Australia?",
      answer: "The Australian Taxation Office (ATO) regards cryptocurrency as both property, which is subject to Capital Gains Tax (CGT), and income, which is subject to Income Tax. CGT applies when you sell, trade, gift, or make purchases using cryptocurrency. On the other hand, Income Tax applies when you receive cryptocurrency as payment for services, work, mining, staking, or other activities. To simplify tax calculations, consider using a free crypto tax calculator for Australia."
    },
    {
      question: "What's the difference between long-term and short-term capital gains?",
      answer: "YThe distinction between long-term and short-term capital gains lies in the duration of ownership. When you own an asset, such as cryptocurrency, for more than 12 months, any gains from its sale are categorised as long-term. These long-term gains often receive a 50% discount on the capital gains tax (CGT). In contrast, if you hold the asset for 12 months or less, the gains are considered short-term, and they are taxed at your regular income tax rate."
    },
  {
question: "Do I have to pay tax on crypto-to-crypto transactions?",
answer:"Yes, according to the ATO, when you trade one cryptocurrency for another, like NFTS, stablecoins, or tokens, it's seen as selling one asset to buy another, and any profit you make from this exchange is subject to Capital Gains Tax. To compute taxes for crypto-to-crypto transactions, you must determine the fair market value of your coins in AUD at both the acquisition and disposal times. However, this can be challenging because many exchanges use cryptocurrency as the standard for valuation. Explore KoinX for a streamlined experience in calculating your cryptocurrency taxes. Our historical price engine swiftly delivers the fair market value of your crypto holdings at the time of each transaction, making tax assessment hassle-free."
  },
];
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState('Long Term');
  const [annualIncome, setAnnualIncome] = useState('45001-120000');
  const [session, setSession]=useState('FY 2023-24');
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const [country,setCountry]=useState('Australia');

  const [capitalGainsAmount, setCapitalGainsAmount] = useState(0);
  const [longTermDiscount, setLongTermDiscount] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToBePaid, setTaxToBePaid] = useState(0);
  const [taxRate, setTaxRate] = useState(''); // State for tax rate
  const [taxRateDescription, setTaxRateDescription] = useState('');
  useEffect(() => {
    calculateTax();
  }, [purchasePrice, salePrice, expenses, investmentType, annualIncome]);

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };
  
  const calculateTax = () => {
    //  Capital Gains Amount
    const capitalGainsAmount = salePrice - purchasePrice - expenses;
    setCapitalGainsAmount(capitalGainsAmount);

    //  Long Term Capital Gains Discount
    let longTermDiscount = 0;
    if (investmentType === 'Long Term' && capitalGainsAmount > 0) {
      longTermDiscount = capitalGainsAmount * 0.5;
    }
    setLongTermDiscount(longTermDiscount);

    //  Net Capital Gains
    const netCapitalGains =
      investmentType === 'Long Term' ? capitalGainsAmount - longTermDiscount : capitalGainsAmount;
    setNetCapitalGains(netCapitalGains);

    //  Tax to be Paid based on the selected Annual Income Range
    const [lowerRange, upperRange] = annualIncome.split('-').map(parseFloat);
    const excessIncome = annualIncome === '180001' ? upperRange - lowerRange : annualIncome - lowerRange;

    if (annualIncome === '0-18200') {
      setTaxRate(0);
      setTaxRateDescription('0%');
      setTaxToBePaid(0);
    } else if (annualIncome === '18201-45000') {
      setTaxRate(0.19);
      setTaxRateDescription('Nil + 19% of excess over $18,200');
      setTaxToBePaid(netCapitalGains * 0.19);
    } else if (annualIncome === '45001-120000') {
      setTaxRate(0.325);
      setTaxRateDescription('$5,902 + 32.5% of excess over $45,001');
      setTaxToBePaid(netCapitalGains * 0.325);
    } else if (annualIncome === '120001-180000') {
      setTaxRate(0.37);
      setTaxRateDescription('$29,467 + 37% of excess over $120,000');
      setTaxToBePaid(netCapitalGains * 0.37);
    } else {
      setTaxRate(0.45);
      setTaxRateDescription('$51,667 + 45% of excess over $180,000');
      setTaxToBePaid(netCapitalGains * 0.45);
    }
  };

  return (
     <div className="container">
    <div className="App">
      <h1>Free Crypto Tax Calculator Australia</h1>
      <table>
          <tbody>
      
        <tr>
          <td>
            <div>
      <label id='fir-sel'>Financial Year</label>
      
      
      <select className='fir-opt'
      value={session}
      onChange={(e) => setSession(e.target.value)}
      >
      <option value="FY 2023-24">FY 2023-24</option>
      </select>
      </div>
      </td>
      <td>
        <div>
      <label id='fir-sel'>Country</label>
      <div className="country-selector">

      <select className='fir-opt'
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      >
      <option value="Australia" className='country-flag'>
            
      🇦🇺 Australia</option>
      </select>
      </div>
      </div>
      </td>
    </tr>
      
        
            <tr>
              <td>
                <label>Enter purchase price of Crypto</label>
                <input
                  type='number'
                  placeholder="Purchase Price"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
              </td>
              <td>
                <label>Enter sale price of Crypto</label>
                <input
                  type="number"
                  placeholder='Sale Price'
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label> Enter your Expenses</label>
                <input
                  type="number"
                  placeholder="Expenses"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </td>
              <td>
            
  <label>Investment Type</label>
  <div className="investment-type-options">
    <div>
  <label className={`rectangle ${selectedCheckbox === "Long Term" ? "selected-checkbox" : ""}`} >
      <input
        type="checkbox"
        value="Long Term"
        checked={investmentType === "Long Term"}
        onChange={() => handleCheckboxChange("Long Term")}
      />
      
    </label>
    
    </div>
    <div>
    <label className={`rectangle ${selectedCheckbox === "Short Term" ? "selected-checkbox" : ""}`}>
      <input
        type="checkbox"
        value="Short Term"
        checked={investmentType === "Short Term"}
        onChange={() => handleCheckboxChange("Short Term")}
      />
      
    </label>
  </div>
  </div>
  <div className='ud-text'><p> &gt; 12 months</p> 
  <p> &lt; 12 months</p></div>
    

    

              </td>
            </tr>
            <tr>
              <td>
                <label>Select Your Annual Income Range</label>
                <select className='inc-opt'
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                >
                  <option value="0-18200">$0 - $18,200</option>
                  <option value="18201-45000">$18,201 - $45,000</option>
                  <option value="45001-120000">$45,001 - $120,000</option>
                  <option value="120001-180000">$120,001 - $180,000</option>
                  <option value="180001">$180,001+</option>
                </select>
                </td>
                <td>
                  <div className='tax-rate'>
                  <p>Tax Rate: <br/> {taxRateDescription} ({(taxRate * 100).toFixed(2)}%)</p>

                  </div>
              </td>
              </tr>
              
              <tr>
              <td>
              <label>Capital Gains Amount:</label>
                    <input
                      type="text"
                      value={`$${capitalGainsAmount}`}
                      readOnly
                    />
                  
                </td>
                <td>
                <label>Discount for Long Term Gains:</label>
                <input type="text" value={`$${longTermDiscount}`} readOnly />
                </td>
                </tr>
                <tr>
                  <td>
                  <textarea className='last-col'
                   id="output"
                  value={`Net Capital Gain Tax Amount\n$${ netCapitalGains}`}
                    readOnly
                   />                
                   </td>
                <td>
                <textarea className='last-col' id='output' value={ `Tax to be Paid*\n$${taxToBePaid.toFixed(2)}`} readOnly/>
                
              </td>
            </tr>
          </tbody>
        </table>
    
      
        
        <h1>Frequently Asked Questions</h1>
        <FAQSection faqData={faqData} />
    
    </div>
    </div>
    
  );
}

export default App;
