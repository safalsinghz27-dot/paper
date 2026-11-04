export interface Tool {
  id: string;
  name: string;
  category: 'PDF Tools' | 'Image Tools' | 'Document Converter';
  slug: string;
  shortDesc: string;
  description: string;
  metaDesc: string;
  h1: string;
  limitation?: string;
  status: 'working' | 'partial';
  icon: string;
}

export const TOOLS: Tool[] = [
  // PDF Tools (5)
  {
    id: 'text-to-pdf',
    name: 'Text to PDF',
    category: 'PDF Tools',
    slug: 'text-to-pdf',
    shortDesc: 'Turn plain text into a downloadable PDF document with this free online Text to PDF converter.',
    description: 'Turn plain text into a downloadable PDF document with this free online Text to PDF converter.',
    metaDesc: 'Turn plain text into a downloadable PDF document with this free online Text to PDF converter.',
    h1: 'Text to PDF Converter',
    status: 'working',
    icon: 'text2pdf.svg'
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    category: 'PDF Tools',
    slug: 'pdf-to-text',
    shortDesc: 'Extract the text content from a PDF file with this free online PDF to Text extractor.',
    description: 'Extract the text content from a PDF file with this free online PDF to Text extractor.',
    metaDesc: 'Extract the text content from a PDF file with this free online PDF to Text extractor.',
    h1: 'PDF to Text Extractor',
    status: 'working',
    icon: 'pdf2txt.svg'
  },
  {
    id: 'pdf-to-csv',
    name: 'PDF to CSV',
    category: 'PDF Tools',
    slug: 'pdf-to-csv',
    shortDesc: 'Extract tabular data from a PDF file into a CSV spreadsheet format.',
    description: 'Extract tabular data from a PDF file into a CSV spreadsheet format.',
    metaDesc: 'Extract tabular data from a PDF file into a CSV spreadsheet format.',
    h1: 'PDF to CSV Converter',
    limitation: 'Complex multi-column PDF layouts and scanned images without text layers may require manual table alignment after export.',
    status: 'partial',
    icon: 'pdf2csv.svg'
  },
  {
    id: 'pdf-to-html',
    name: 'PDF to HTML',
    category: 'PDF Tools',
    slug: 'pdf-to-html',
    shortDesc: 'Convert PDF content into clean HTML code with this free online PDF to HTML converter.',
    description: 'Convert PDF content into clean HTML code with this free online PDF to HTML converter.',
    metaDesc: 'Convert PDF content into clean HTML code with this free online PDF to HTML converter.',
    h1: 'PDF to HTML Converter',
    status: 'working',
    icon: 'pdf2html.svg'
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    category: 'PDF Tools',
    slug: 'pdf-to-excel',
    shortDesc: 'Convert tables from a PDF file into an Excel (.xlsx) spreadsheet.',
    description: 'Convert tables from a PDF file into an Excel (.xlsx) spreadsheet.',
    metaDesc: 'Convert tables from a PDF file into an Excel (.xlsx) spreadsheet.',
    h1: 'PDF to Excel Converter',
    limitation: 'Advanced visual gridlines and complex nested table borders in PDF files are extracted as linear row-column text cells.',
    status: 'partial',
    icon: 'pdf2excl.svg'
  },

  // Image Tools (2)
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    category: 'Image Tools',
    slug: 'image-to-pdf',
    shortDesc: 'Convert JPG, PNG or WebP images into a PDF file with this free online Image to PDF converter.',
    description: 'Convert JPG, PNG or WebP images into a PDF file with this free online Image to PDF converter.',
    metaDesc: 'Convert JPG, PNG or WebP images into a PDF file with this free online Image to PDF converter.',
    h1: 'Image to PDF Converter',
    status: 'working',
    icon: 'img2pdf.svg'
  },
  {
    id: 'text-to-image',
    name: 'Text to Image',
    category: 'Image Tools',
    slug: 'text-to-image',
    shortDesc: 'Render text or code as a shareable PNG image with this free online Text to Image tool.',
    description: 'Render text or code as a shareable PNG image with this free online Text to Image tool.',
    metaDesc: 'Render text or code as a shareable PNG image with this free online Text to Image tool.',
    h1: 'Text to Image Converter',
    status: 'working',
    icon: 'txt2img.svg'
  },

  // Document Converter (7)
  {
    id: 'jpg-to-word',
    name: 'JPG to Word',
    category: 'Document Converter',
    slug: 'jpg-to-word',
    shortDesc: 'Extract text from a JPG image into an editable Word document.',
    description: 'Extract text from a JPG image into an editable Word document.',
    metaDesc: 'Extract text from a JPG image into an editable Word document.',
    h1: 'JPG to Word Converter',
    limitation: 'Relies on client-side parsing; does not include full optical character recognition (OCR) for complex hand-written or low-resolution scans.',
    status: 'partial',
    icon: 'jpg2word.svg'
  },
  {
    id: 'text-to-word',
    name: 'Text to Word',
    category: 'Document Converter',
    slug: 'text-to-word',
    shortDesc: 'Convert plain text into a Microsoft Word (.docx) document with this free online tool.',
    description: 'Convert plain text into a Microsoft Word (.docx) document with this free online tool.',
    metaDesc: 'Convert plain text into a Microsoft Word (.docx) document with this free online tool.',
    h1: 'Text to Word Converter',
    status: 'working',
    icon: 'txt2wrd.svg'
  },
  {
    id: 'excel-to-csv',
    name: 'Excel to CSV',
    category: 'Document Converter',
    slug: 'excel-to-csv',
    shortDesc: 'Convert Excel workbooks (.xlsx, .xls) into standard CSV files.',
    description: 'Convert Excel workbooks (.xlsx, .xls) into standard CSV files.',
    metaDesc: 'Convert Excel workbooks (.xlsx, .xls) into standard CSV files.',
    h1: 'Excel to CSV Converter',
    status: 'working',
    icon: 'excl2csv.svg'
  },
  {
    id: 'word-to-excel',
    name: 'Word to Excel',
    category: 'Document Converter',
    slug: 'word-to-excel',
    shortDesc: 'Extract tables from a Word document into an Excel spreadsheet.',
    description: 'Extract tables from a Word document into an Excel spreadsheet.',
    metaDesc: 'Extract tables from a Word document into an Excel spreadsheet.',
    h1: 'Word to Excel Converter',
    limitation: 'Extracts paragraph text lines into rows; complex embedded document tables require clean formatting.',
    status: 'partial',
    icon: 'word2ecxcl.svg'
  },
  {
    id: 'word-to-jpg',
    name: 'Word to JPG',
    category: 'Document Converter',
    slug: 'word-to-jpg',
    shortDesc: 'Convert Word document pages into JPG images.',
    description: 'Convert Word document pages into JPG images.',
    metaDesc: 'Convert Word document pages into JPG images.',
    h1: 'Word to JPG Converter',
    limitation: 'Generates a styled document page snapshot rather than vector layout rendering.',
    status: 'partial',
    icon: 'wrd2jpg.svg'
  },
  {
    id: 'csv-to-excel',
    name: 'CSV to Excel',
    category: 'Document Converter',
    slug: 'csv-to-excel',
    shortDesc: 'Convert CSV data into a formatted Excel (.xlsx) workbook.',
    description: 'Convert CSV data into a formatted Excel (.xlsx) workbook.',
    metaDesc: 'Convert CSV data into a formatted Excel (.xlsx) workbook.',
    h1: 'CSV to Excel Converter',
    status: 'working',
    icon: 'csv 2excl.svg'
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    category: 'Document Converter',
    slug: 'excel-to-pdf',
    shortDesc: 'Convert Excel spreadsheets into printable PDF documents.',
    description: 'Convert Excel spreadsheets into printable PDF documents.',
    metaDesc: 'Convert Excel spreadsheets into printable PDF documents.',
    h1: 'Excel to PDF Converter',
    status: 'working',
    icon: 'excl2pdf.svg'
  }
];

export const CATEGORIES = ['PDF Tools', 'Image Tools', 'Document Converter'] as const;
