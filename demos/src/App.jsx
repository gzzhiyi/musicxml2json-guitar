import React, { useState } from 'react'
import {
  Parser,
  getChordName,
  noteTypeToNumber,
  numberToNoteType
} from '../dist/index.esm.js'

export default function App() {
  const [parsedData, setParsedData] = useState(null)

  function parseXML(xmlStr) {
    const parser = new Parser({ xmlStr, debug: true })
    setParsedData({
      chordName: getChordName(data),
      measure: parser.getMeasureById('M_2'),
      note: parser.getNoteById('N_2_2'),
      noteNumber: noteTypeToNumber('16th'),
      noteType: numberToNoteType(32)
    })
  }

  function handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        parseXML(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  function handleDrop(event) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        parseXML(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  return (
    <div>
      <h1>Demo</h1>
      <input type="file" accept=".xml" onChange={handleFileUpload} />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '2px dashed #ccc', padding: '20px', marginTop: '10px' }}
      >
        Drag & Drop XML File Here
      </div>
      {parsedData && (
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
      )}
    </div>
  )
}
