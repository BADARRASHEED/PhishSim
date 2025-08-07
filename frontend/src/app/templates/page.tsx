'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../components/admin/Sidebar'
import { PlusCircle, Eye, Pencil, Trash2, X } from 'lucide-react'
import { EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from 'next/link'

// Template type
type Template = {
  id: number
  name: string
  subject: string
  difficulty: string
  scenario: string
  content: string
  lastUpdated?: string
}

const initialTemplates: Template[] = [
  {
    id: 1,
    name: 'PayPal Alert',
    subject: 'Unusual login detected',
    difficulty: 'High',
    scenario: 'Banking',
    content: '<p>Your account may be compromised. Log in to secure it.</p>',
    lastUpdated: '05/08/25',
  },
  {
    id: 2,
    name: 'Tax Notice',
    subject: 'Immediate action required',
    difficulty: 'Medium',
    scenario: 'Tax',
    content: '<p>Please review your tax details.</p>',
    lastUpdated: '04/08/25',
  },
]

export default function TemplateLibraryPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [current, setCurrent] = useState<Template | null>(null)
  const [editor, setEditor] = useState<Editor | null>(null)

  const filtered = templates.filter(t =>
    (filter === '' || filter === t.difficulty || filter === t.scenario) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()))
  )

  useEffect(() => {
    if (current && typeof window !== 'undefined') {
      const e = new Editor({
        extensions: [StarterKit],
        content: current.content,
        editorProps: {
          attributes: {
            class: 'bg-white text-black p-3 rounded h-72 overflow-y-auto',
          },
        },
      })

      setEditor(e)
    }

    return () => {
      editor?.destroy()
    }
  }, [current])

  const openModal = (template: Template) => {
    setCurrent(template)
    setIsModalOpen(true)
  }

  const saveTemplate = () => {
    if (!current || !editor) return
    const updated = editor.getHTML()
    setTemplates(prev =>
      prev.map(t =>
        t.id === current.id
          ? { ...t, content: updated, lastUpdated: new Date().toLocaleDateString('en-GB') }
          : t
      )
    )
    setIsModalOpen(false)
    editor?.destroy()
    setEditor(null)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#0F0C29] text-white p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-400">Template Library</h1>
          <Link
            href="/templates/create"
            className="flex items-center gap-2 bg-[#FF2E63] px-4 py-2 rounded hover:bg-[#e82b58]"
          >
            <PlusCircle size={20} /> Add New Template
          </Link>
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or subject"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 rounded bg-[#1C1B29] text-white placeholder-gray-400 w-1/3"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-2 rounded bg-[#1C1B29] text-white"
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Banking">Banking</option>
            <option value="Tax">Tax</option>
            <option value="Social Media">Social Media</option>
          </select>
        </div>

        <div className="bg-[#1C1B29] rounded-lg p-6 shadow-md overflow-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Difficulty</th>
                <th>Scenario</th>
                <th>Last Updated</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[#2a293f] border-b border-gray-800">
                  <td className="py-3">{t.name}</td>
                  <td className="py-3">{t.subject}</td>
                  <td className="py-3">{t.difficulty}</td>
                  <td className="py-3">{t.scenario}</td>
                  <td className="py-3">{t.lastUpdated}</td>
                  <td className="flex justify-center py-3 gap-2">
                    <button onClick={() => openModal(t)} className="hover:text-blue-400"><Eye size={18} /></button>
                    <button onClick={() => openModal(t)} className="hover:text-yellow-400"><Pencil size={18} /></button>
                    <button className="hover:text-red-400"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {current && isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-[#1C1B29] rounded-lg w-full max-w-3xl p-6 relative">
              <button
                onClick={() => { setIsModalOpen(false); setEditor(null); }}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl mb-4 font-bold">{current.name}</h2>
              <input
                type="text"
                value={current.subject}
                readOnly
                className="w-full mb-2 px-3 py-2 rounded bg-[#2a293f] text-white"
              />
              {editor && <EditorContent editor={editor} />}
              <div className="mt-4 flex justify-end gap-4">
                <button onClick={() => { setIsModalOpen(false); setEditor(null); }} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                <button onClick={saveTemplate} className="px-4 py-2 bg-[#FF2E63] rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
