import { useState, useEffect } from "react";

function DocumentsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
const [searchTerm, setSearchTerm] = useState("");
const items = [
  // LEGAL DOCUMENTS 
  {
    category: "Legal Document",
    title: "Affidavit Format",
    description: "Standard affidavit for declarations.",
    file: "/public/pdfs/affidavit-format.pdf",
    image: "/public/images/image1.png",
  },
  {
    category: "Legal Document",
    title: "Divorce Petition Format",
    description: "Petition format for divorce filing.",
    file: "/public/pdfs/divorce-petition-format.pdf",
    image: "/public/images/image2.png",
  },
  {
    category: "Legal Document",
    title: "Gift Deed Format",
    description: "Property gift deed legal format.",
    file: "/public/pdfs/gift-deed-format.pdf",
    image: "/public/images/image3.png",
  },
  {
    category: "Legal Document",
    title: "Lease Agreement",
    description: "Residential lease agreement format.",
    file: "/public/pdfs/lease-agreement.pdf",
    image: "/public/images/image4.png",
  },
  {
    category: "Legal Document",
    title: "Legal Notice Format",
    description: "Formal legal notice format.",
    file: "/public/pdfs/legal-notice-format.pdf",
    image: "/public/images/image5.png",
  },
  {
    category: "Legal Document",
    title: "Partnership Deed",
    description: "Partnership deed agreement format.",
    file: "/public/pdfs/partnership-deed.pdf",
    image: "/public/images/image6.png",
  },
  {
    category: "Legal Document",
    title: "Power of Attorney",
    description: "General power of attorney format.",
    file: "/public/pdfs/power-of-attorney.pdf",
    image: "/public/images/image7.png",
  },
  {
    category: "Legal Document",
    title: "Rental Agreement",
    description: "House rental agreement sample.",
    file: "/public/pdfs/rental-agreement.pdf",
    image: "/public/images/image8.png",
  },
  {
    category: "Legal Document",
    title: "Sale Deed Format",
    description: "Property sale deed legal format.",
    file: "/public/pdfs/sale-deed-format.pdf",
    image: "/public/images/image9.png",
  },
  {
    category: "Legal Document",
    title: "Will Testament Format",
    description: "Legal will and testament format.",
    file: "/public/pdfs/will-testament-format.pdf",
    image: "/public/images/image10.png",
  },

  //  LEGAL TEMPLATES 
  {
    category: "Legal Template",
    title: "Consultancy Agreement Template",
    description: "Template for consultancy contracts.",
    file: "/public/pdfs/consultancy-agreement-template.pdf",
    image: "/public/images/image11.png",
  },
  {
    category: "Legal Template",
    title: "Employment Agreement Template",
    description: "Standard employment contract template.",
    file: "/public/pdfs/employment-agreement-template.pdf",
    image: "/public/images/image12.png",
  },
  {
    category: "Legal Template",
    title: "Freelance Contract Template",
    description: "Freelancer service contract template.",
    file: "/public/pdfs/freelance-contract-template.pdf",
    image: "/public/images/image13.png",
  },
  {
    category: "Legal Template",
    title: "Loan Agreement Template",
    description: "Loan agreement legal template.",
    file: "/public/pdfs/loan-agreement-template.pdf",
    image: "/public/images/image14.png",
  },
  {
    category: "Legal Template",
    title: "MOU Template",
    description: "Memorandum of Understanding format.",
    file: "/public/pdfs/mou-template.pdf",
    image: "/public/images/image15.png",
  },
  {
    category: "Legal Template",
    title: "NDA Template",
    description: "Non-disclosure agreement template.",
    file: "/public/pdfs/nda-template.pdf",
    image: "/public/images/image16.png",
  },
  {
    category: "Legal Template",
    title: "Privacy Policy Template",
    description: "Website privacy policy format.",
    file: "/public/pdfs/privacy-policy-template.pdf",
    image: "/public/images/image17.png",
  },
  {
    category: "Legal Template",
    title: "Service Agreement Template",
    description: "Professional service agreement template.",
    file: "/public/pdfs/service-agreement-template.pdf",
    image: "/public/images/image18.png",
  },
  {
    category: "Legal Template",
    title: "Terms & Conditions Template",
    description: "Website terms and conditions template.",
    file: "/public/pdfs/terms-conditions-template.pdf",
    image: "/public/images/image19.png",
  },
  {
    category: "Legal Template",
    title: "Vendor Agreement Template",
    description: "Vendor contract template format.",
    file: "/public/pdfs/vendor-agreement-template.pdf",
    image: "/public/images/image20.png",
  },
];
const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const documents = filteredItems.filter(
    (item) => item.category === "Legal Document"
  );

  const templates = filteredItems.filter(
    (item) => item.category === "Legal Template"
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Legal Documents & Templates</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search documents or templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LEGAL DOCUMENTS */}
      <h2 className="section-heading">Legal Documents</h2>
      <div className="card-grid">
        {documents.map((item, index) => (
          <div key={index} className="page-card">
            <img 
  src={item.image} 
  alt={item.title} 
  className="card-image"
  loading="lazy"
/>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            {/* READ BUTTON */}
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
            >
              Read
            </a>
          </div>
        ))}
      </div>

      {/* LEGAL TEMPLATES */}
      <h2 className="section-heading">Legal Templates</h2>
      <div className="card-grid">
        {templates.map((item, index) => (
          <div key={index} className="page-card">
            <img src={item.image} alt={item.title} className="card-image" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            {/* DOWNLOAD BUTTON */}
            <a href={item.file} download className="primary-btn">
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;