// import React from 'react';
// import { Container, Typography, Button } from '@mui/material';

// const PdfViewer = () => {
//   const pdfUrl = 'https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf';

//   const handleViewPdf = () => {
//     window.open(
//       `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`,
//       'PDF Viewer',
//       'width=800,height=600'
//     );
//   };

//   return (
//     <Container maxWidth="xl">
//       <Typography variant="h4" sx={{ mb: 5 }}>
//         View PDF
//       </Typography>

//       <Button variant="contained" onClick={handleViewPdf}>
//         View PDF
//       </Button>
//     </Container>
//   );
// };

// export default PdfViewer;

////////////////////////////

// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// const url = 'https://cors-anywhere.herokuapp.com/https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf';

// export default function PdfViewer() {
//   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   /*To Prevent right click on screen*/
//   document.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
//   });

//   /*When document gets loaded successfully*/
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   function changePage(offset) {
//     setPageNumber((prevPageNumber) => prevPageNumber + offset);
//   }

//   function previousPage() {
//     changePage(-1);
//   }

//   function nextPage() {
//     changePage(1);
//   }

//   return (
//     <>
//       <div className="main">
//         <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
//           <Page pageNumber={pageNumber} />
//         </Document>
//         <div>
//           <div className="pagec">
//             Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
//           </div>
//           <div className="buttonc">
//             <button type="button" disabled={pageNumber <= 1} onClick={previousPage} className="Pre">
//               Previous
//             </button>
//             <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useState } from 'react';
import { Container, Typography, Button, Modal } from '@mui/material';

const PdfViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pdfUrl = 'https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf';

  const handleViewPdf = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        View PDF
      </Typography>

      <Button variant="contained" onClick={handleViewPdf}>
        View PDF
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="pdf-modal-title"
        aria-describedby="pdf-modal-description"
      >
        <div>
          {isModalOpen && (
            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              width="100%"
              height="700px"
            />
          )}
        </div>
      </Modal>
    </Container>
  );
};

export default PdfViewer;
