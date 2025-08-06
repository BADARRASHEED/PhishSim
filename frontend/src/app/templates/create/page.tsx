'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Sidebar from '@/app/components/admin/Sidebar'

export default function CreateTemplatePage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [scenario, setScenario] = useState('')
  const [error, setError] = useState('')
  const [editor, setEditor] = useState<Editor | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  useEffect(() => {
    const newEditor = new Editor({
      extensions: [StarterKit],
      content: '<p>Start typing your phishing email template here...</p>',
      editorProps: {
        attributes: {
          class: 'bg-white text-black p-3 rounded h-72 overflow-y-auto',
        },
      },
    })
    setEditor(newEditor)

    return () => {
      newEditor.destroy()
    }
  }, [])

  const handleSubmit = () => {
    if (!name || !subject || !difficulty || !scenario || !editor?.getHTML()) {
      setError('Please fill out all fields and content.')
      return
    }

    const newTemplate = {
      id: Date.now(),
      name,
      subject,
      difficulty,
      scenario,
      content: editor.getHTML(),
      lastUpdated: new Date().toLocaleDateString('en-GB'),
    }

    console.log('Saved Template:', newTemplate)
    router.push('/templates')
  }

  const confirmCancel = () => {
    setShowCancelModal(true)
  }

  const handleConfirmCancel = () => {
    setShowCancelModal(false)
    router.push('/templates')
  }

  const handleCancelModalClose = () => {
    setShowCancelModal(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-[#0F0C29] text-white p-8 overflow-y-auto relative">
        <h1 className="text-2xl font-bold mb-6">Create New Template</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
            placeholder="Template Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
            placeholder="Subject Line"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <select
            className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            className="w-full px-3 py-2 rounded bg-[#1C1B29] text-white"
            value={scenario}
            onChange={e => setScenario(e.target.value)}
          >
            <option value="">Select Scenario</option>
            <option value="Banking">Banking</option>
            <option value="Tax">Tax</option>
            <option value="Social Media">Social Media</option>
          </select>

          {editor && (
            <div className="bg-white rounded">
              <EditorContent editor={editor} />
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#FF2E63] px-6 py-2 rounded hover:bg-[#e82b58]"
            >
              Save Template
            </button>

            <button
              onClick={confirmCancel}
              className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Custom Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-[#1C1B29] text-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Cancel Confirmation</h2>
              <p className="mb-6">Are you sure you want to cancel? Unsaved changes will be lost.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelModalClose}
                  className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
                >
                  No, Go Back
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 bg-[#FF2E63] rounded hover:bg-[#e82b58]"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
