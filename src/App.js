import React, { useEffect, useState } from 'react';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import tuvBlack from './images/tuv-black.PNG'
import kanBlack from './images/kan-black.PNG'

const App = () => {
  const [kan, setKan] = useState('')
  const [tuv, setTuv] = useState('')
  useEffect(() => {
    function toDataUrl(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
    toDataUrl(kanBlack, function (myBase64) {
      setKan(myBase64); // myBase64 is the base64 string
    })
    toDataUrl(tuvBlack, function (myBase64) {
      setTuv(myBase64); // myBase64 is the base64 string
    })
  }, [kanBlack, tuvBlack])

  const printDocument = () => {
    const dateTimes = [
      '2022-02-02 From : 16:05 To:17:05',
      '2022-02-02 From : 16:05 To:17:05',
      '2022-02-02 From : 16:05 To:17:05',
      '2022-02-02 From : 16:05 To:17:05',
      '2022-02-02 From : 16:05 To:17:05',
      '2022-02-02 From : 16:05 To:17:05',
    ]

    const pdfTable = document.getElementById('divToPrint')
    const standardPrint = document.getElementById('standardPrint')
    const html = htmlToPdfmake(pdfTable.innerHTML)
    const htmlStandard = htmlToPdfmake(standardPrint.innerHTML)
    const documentDefinition = {
      pageOrientation: 'portrait',
      pageSize: 'A4',
      content: [
        {
          text: 'SURAT JALAN',
          style: 'suratJalan'
        },
        {
          columns: [
            {
              text: 'Schedule Code',
              style: 'info',
              width: 175
            },
            {
              text: 'SCH..22020031',
              style: 'info',
              width: 'auto'
            }
          ],
        },
        {
          columns: [
            {
              text: 'Customer Name',
              style: 'info',
              width: 175
            },
            {
              text: 'LenyACC',
              style: 'info',
              width: 'auto'
            }
          ],
        },
        {
          columns: [
            {
              text: 'Customer Address',
              style: 'info',
              width: 175
            },
            {
              text: 'TokoUtama- dan1',
              style: 'info',
              width: 'auto'
            }
          ],
        },
        {
          columns: [
            {
              text: 'Calibration Date',
              style: 'info',
              width: 175
            },
            {
              stack: dateTimes,
              style: 'info',
            }
          ],
        },
        {
          text: 'Artefact Detail',
          style: 'tableTitle'
        },
        html,
        {
          text: 'Standards',
          style: 'tableTitleStandard'
        },
        htmlStandard,
        {
          style: 'Note',
          table: {
            heights: [50, 50, 50, 50],
            widths: [115, 115, 115, 115],
            body: [
              ['Note', 'Customer', 'Teknisi Kalibrasi', 'Kaji Ulang'],
            ]
          }
        },
      ],

      footer: function name(currentPage, pageCount, pageSize) {
        return [
          { canvas: [{ type: 'rect', x: 25, y: 20, w: pageSize.width - 60, h: .25 }] },
          {
            marginLeft: 20,
            marginRight: 20,
            columns: [
              {
                stack: [
                  { text: 'PT TUV NORD INDONESIA', bold: true },
                  { text: 'Head Office', marginTop: 5, bold: true },
                  { text: 'Perkantoran Hijau Arkadia, TowerF', fontSize: 6 },
                  { text: '7th Floor, Suite706 JL TB', fontSize: 6 },
                  { text: 'Simatupang Kav 88, Jakarta Selatan', fontSize: 6 },
                  { text: 'Telepon +62 21 78837338', fontSize: 6 },
                  { text: 'Fax. +62 21 78837336', fontSize: 6 },
                  { text: 'Emailindonesia@tuv-nord.com', fontSize: 6 },
                ],
                style: 'footer',
              },
              {
                stack: [
                  { text: 's', color: 'white' },
                  { text: 'Laboratory & LS Pro Depratment', marginTop: 5, bold: true },
                  { text: 'Jl Science Timur 1 Block B3-F1', fontSize: 6 },
                  { text: 'Cikarang-Bekasi17530', fontSize: 6 },
                  { text: 'Telp. +62 21 29574720', fontSize: 6 },
                  { text: 'Emailindonesia@tuv-nord.com', fontSize: 6 },
                ],
                style: 'footer',
              },
              {
                stack: [
                  { text: 's', color: 'white' },
                  { text: 'Surabaya Branch Office', marginTop: 5, bold: true },
                  { text: 'Intiland Tower11th Floor, Suite1 E,', fontSize: 6 },
                  { text: 'Jalan Panglima Sudirman 101-103', fontSize: 6 },
                  { text: 'Surabaya 60271', fontSize: 6 },
                  { text: 'Telp. +62 31 5344454', fontSize: 6 },
                  { text: 'Fax. +62 31 5344482', fontSize: 6 },
                  { text: 'Emailindonesia@tuv-nord.com', fontSize: 6 },
                ],
                style: 'footer',
              },
              {
                stack: [
                  { text: 's', color: 'white' },
                  { text: 'Medan Representative Office', marginTop: 5, bold: true },
                  { text: 'Forum Nine - CIMB Building,9th Jl.', fontSize: 6 },
                  { text: 'Imam Bonjol No. 9 Medan 20112', fontSize: 6 },
                  { text: 'Indonesia', fontSize: 6 },
                  { text: 'Telp: +62 61 88818957', fontSize: 6 },
                ],
                style: 'footer',
              },
            ],
          }
        ]
      },
      pageMargins: [30, 135, 20, 115],
      header: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        columns: [
          {
            image: kan,
            width: 140
          },
          {
            image: tuv,
            width: 140
          },
        ],
        columnGap: 250
      },
      styles: {
        footer: {
          marginTop: 5,
          marginLeft: 10,
          fontSize: 8,
        },
        Note: {
          fontSize: 10,
          bold: true,
          marginTop: 15,
          textAlign: 'center'
        },
        tableTitle: {
          fontSize: 22,
          bold: true,
          marginTop: 5,
          marginBottom: 5
        },
        tableTitleStandard: {
          fontSize: 22,
          bold: true,
          marginTop: 15,
          marginBottom: 5
        },
        suratJalan: {
          fontSize: 22,
          bold: true,
          marginTop: 1,
          marginBottom: 10
        },
        info: {
          fontSize: 10,
          marginTop: 3,
          marginBottom: 3,
          marginLeft: 10
        },
        table1: {
          marginTop: 20,
        },
      },
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();

  }


  return (
    <div className="App container mt-5">
      <button class="btn btn-primary" onClick={() => printDocument()}>Export To PDF</button>
      <div id="divToPrint" style={{ display: 'none' }}>
        <table id="t" class="table">
          <thead>
            <tr>
              <th style={{ fontSize: '12px', textAlign: 'center', width: '15px' }} >No</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: '20px' }} >Code</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: '23px' }} >Name</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: '40px' }} >Order Code</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: '30px' }} >No PO</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Model</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Brand</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Resolusi</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Serial No</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Capacity</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Location</th>
              <th style={{ fontSize: '12px', textAlign: 'center', width: 'auto' }} >Desc</th>
            </tr>
          </thead>
          <tbody>
            {
              [1, 1, 1].map(a => {
                return <>
                  <tr>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>1</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>ART.22010042</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>Kabel Kipas</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>PO.22020006</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>-</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>panjang</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>Cuda</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>5</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>sercabe5</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>500</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>-</td>
                    <td style={{ fontSize: '12px', textAlign: 'center', width: 'auto', }}>Bagus</td>
                  </tr>
                  <tr style={{ margin: '5px 0' }}>
                    <th></th>
                    <th colSpan="11" style={{ fontSize: '10px', }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Parameter</span>
                      <table >
                        <tr border="0" style={{ border: 0 }}>
                          <td border="0" style={{ border: 0 }}>Method:</td>
                          <td border="0" style={{ border: 0 }} >{'data.methodName'}</td>
                          <td border="0" style={{ border: 0, color: '#EEE' }} >lorem ipsum</td>
                          <td border="0" style={{ border: 0 }}>Range</td>
                          <td border="0" style={{ border: 0 }} >data.range</td>
                        </tr>
                        <tr border="0" style={{ border: 0 }}>
                          <td border="0" style={{ border: 0 }}>Measuring:</td>
                          <td border="0" style={{ border: 0 }} >{'data.methodName'}</td>
                          <td border="0" style={{ border: 0, color: '#EEE' }} >lorem ipsum</td>
                          <td border="0" style={{ border: 0 }}>Jumlah</td>
                          <td border="0" style={{ border: 0 }} >data.range</td>
                        </tr>
                        <tr border="0" style={{ border: 0 }}>
                          <td border="0" style={{ border: 0 }}>Device:</td>
                          <td border="0" style={{ border: 0 }} >{'data.methodName'}</td>
                          <td border="0" style={{ border: 0, color: '#EEE' }} >lorem ipsum</td>
                          <td border="0" style={{ border: 0 }}>Point</td>
                          <td border="0" style={{ border: 0 }} >data.range</td>
                        </tr>
                        <tr>
                          <td border="0" style={{ border: 0 }}>Total:</td>
                          <td border="0" style={{ border: 0 }} colSpan={4}>{'data.methodName'}</td>
                        </tr>
                      </table>
                    </th>
                  </tr>
                </>
              })
            }
          </tbody>
        </table>
      </div>

      <div id="standardPrint" style={{ display: 'none' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>No</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', }}>Code</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>Name</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>Range</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>Inventory No</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>Merk</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>Type</th>
              <th style={{ width: '40px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>Serial No</th>
            </tr>
          </thead>
          <tbody>
            <tr  >
              <td style={{ fontSize: '12px', textAlign: 'center' }}>1</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
              <td style={{ fontSize: '12px', textAlign: 'center' }}>lorem ipsum</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}


const Footer = () => {
  return <footer style={{ borderTop: '1px solid black', padding: '.5rem', marginTop: '1px' }}>
    <p style={{ fontWeight: 'bold', fontSize: '8px', marginBottom: '.25px' }}>PT TUV NORD INDONESIA</p>
    <div style={{ display: 'flex', gap: '.5rem', }}>
      <div className='head-field' style={{ flex: 1 }}>
        <p style={{ fontSize: '6px', marginBottom: '.25px', fontWeight: 'bold' }}>Head Office</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Perkantoran Hijau Arkadia, Tower F </p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>7th Floor, Suite 706 JL TB</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Simatupang Kav 88, Jakarta Selatan</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Telepon +62 21 78837338</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Fax. +62 21 78837336</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Email indonesia@tuv-nord.com</p>

      </div>
      <div className='lab-field' style={{ flex: 1 }}>
        <p style={{ fontSize: '6px', marginBottom: '.25px', fontWeight: 'bold' }}>Laboratory & LSPro Depratment</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Jl Science Timur 1 Block B3-F1</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Kawasan &nbsp; Industri Jabadeka V Cibatu</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Cikarang-Bekasi 17530</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Telp. +62 21 29574720</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Email indonesia@tuv-nord.com</p>

      </div>
      <div className='surabaya-field' style={{ flex: 1 }}>
        <p style={{ fontSize: '6px', marginBottom: '.25px', fontWeight: 'bold' }}>Surabaya Branch Office</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Intiland Tower 11th Floor, Suite 1 E,</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Jalan Panglima &nbsp; Sudirman 101-103</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Surabaya 60271</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Telp. +62 31 5344454</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Fax. +62 31 5344482</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Email indonesia@tuv-nord.com</p>
      </div>
      <div className='medan-field' style={{ flex: 1 }}>
        <p style={{ fontSize: '6px', marginBottom: '.25px', fontWeight: 'bold' }}>Medan Representative Office</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Forum Nine - CIMB Building, 9th Jl.</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Imam Bonjol No. 9 Medan 20112</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Indonesia</p>
        <p style={{ fontSize: '6px', marginBottom: '.25px' }}>Telp : +62 61 88818957</p>
      </div>

    </div>

  </footer>
}

export default App;