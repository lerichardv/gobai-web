"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Link } from '@tiptap/extension-link'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Table as TableIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  Code,
  Quote,
  Maximize,
  Square,
  Circle,
  Type,
  Settings2,
  ChevronDown,
  Rows,
  Columns as ColumnsIcon,
  Grid3X3,
  Trash,
  Palette
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ImageUploadModal } from './image-upload-modal'

const CustomImage = ImageResize.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      borderRadius: {
        default: '0rem',
        parseHTML: element => element.style.borderRadius,
        renderHTML: attributes => {
          return {
            style: `border-radius: ${attributes.borderRadius || '0rem'}`,
          }
        },
      },
    }
  },
})

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const addImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL del enlace', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5 sticky top-0 z-10">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      
      <div className="w-px h-4 bg-white/10 mx-1 self-center" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-gobai-cyan"
            title="Color de Texto"
          >
            <div className="flex flex-col items-center gap-0.5">
              <Palette className="h-4 w-4" />
              <div 
                className="w-3 h-0.5 rounded-full" 
                style={{ backgroundColor: editor.getAttributes('textStyle').color || 'currentColor' }} 
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-[#00040a] border-white/10 p-3">
          <div className="grid grid-cols-5 gap-2">
            {[
              '#000000', '#334155', '#64748b', '#94a3b8', '#ffffff',
              '#07BFD8', '#62E4FF', '#00040a', '#EF4444', '#10B981',
              '#F59E0B', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E'
            ].map((color) => (
              <button
                key={color}
                onClick={() => editor.chain().focus().setMark('textStyle', { color }).run()}
                className="w-6 h-6 rounded-full border border-white/10 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white"
            onClick={() => editor.chain().focus().unsetMark('textStyle').run()}
          >
            Resetear Color
          </Button>
        </PopoverContent>
      </Popover>

      <div className="w-px h-4 bg-white/10 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <span className="font-black text-[10px]">H1</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <span className="font-black text-[10px]">H2</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <span className="font-black text-[10px]">H3</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <span className="font-black text-[10px]">H4</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <span className="font-black text-[10px]">H5</span>
      </Button>

      <div className="w-px h-4 bg-white/10 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <div className="w-px h-4 bg-white/10 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-4 bg-white/10 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={setLink}
        className={editor.isActive('link') ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <ImageUploadModal onSelect={addImage} />

      {/* Image Controls - Only show when image is selected */}
      {editor.isActive('image') && (
        <>
          <div className="w-px h-4 bg-white/10 mx-1 self-center" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().updateAttributes('image', { borderRadius: '0rem' }).run()}
            className={editor.getAttributes('image').borderRadius === '0rem' ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
            title="Borde Recto"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().updateAttributes('image', { borderRadius: '1rem' }).run()}
            className={editor.getAttributes('image').borderRadius === '1rem' ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
            title="Borde Redondeado"
          >
            <Maximize className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().updateAttributes('image', { borderRadius: '2.5rem' }).run()}
            className={editor.getAttributes('image').borderRadius === '2.5rem' ? 'bg-white/10 text-gobai-cyan' : 'text-white/60'}
            title="Borde Premium"
          >
            <Circle className="h-4 w-4" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-gobai-cyan"
                title="Personalizar Esquinas"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-[#00040a] border-white/10 text-white p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/60">Redondeo</Label>
                  <span className="text-gobai-cyan font-mono text-xs">
                    {editor.getAttributes('image').borderRadius || '0rem'}
                  </span>
                </div>
                <Slider 
                  defaultValue={[parseFloat(editor.getAttributes('image').borderRadius) || 0]} 
                  max={100} 
                  step={1}
                  onValueChange={([val]) => {
                    editor.chain().focus().updateAttributes('image', { borderRadius: `${val}px` }).run()
                  }}
                  className="py-4"
                />
                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 20, 40].map((v) => (
                    <button
                      key={v}
                      onClick={() => editor.chain().focus().updateAttributes('image', { borderRadius: `${v}px` }).run()}
                      className="text-[10px] font-bold p-1 bg-white/5 rounded border border-white/5 hover:border-gobai-cyan/50"
                    >
                      {v}px
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="text-white/60 hover:text-gobai-cyan"
          title="Insertar Tabla"
        >
          <TableIcon className="h-4 w-4" />
        </Button>

        {editor.isActive('table') && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gobai-cyan bg-gobai-cyan/10"
                title="Acciones de Tabla"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-[#00040a] border-white/10 text-white p-2">
              <div className="grid grid-cols-1 gap-1">
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-white/80 hover:text-white"
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                >
                  <ColumnsIcon className="h-3 w-3 mr-2" /> Agregar Columna Antes
                </Button>
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-white/80 hover:text-white"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  <ColumnsIcon className="h-3 w-3 mr-2" /> Agregar Columna Después
                </Button>
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-red-400 hover:text-red-300"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                >
                  <Trash className="h-3 w-3 mr-2" /> Eliminar Columna
                </Button>
                
                <div className="h-px bg-white/5 my-1" />
                
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-white/80 hover:text-white"
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                >
                  <Rows className="h-3 w-3 mr-2" /> Agregar Fila Arriba
                </Button>
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-white/80 hover:text-white"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                  <Rows className="h-3 w-3 mr-2" /> Agregar Fila Abajo
                </Button>
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-red-400 hover:text-red-300"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                >
                  <Trash className="h-3 w-3 mr-2" /> Eliminar Fila
                </Button>

                <div className="h-px bg-white/5 my-1" />

                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-white/80 hover:text-white"
                  onClick={() => editor.chain().focus().mergeCells().run()}
                >
                  <Grid3X3 className="h-3 w-3 mr-2" /> Combinar Celdas
                </Button>
                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-white/80 hover:text-white"
                  onClick={() => editor.chain().focus().splitCell().run()}
                >
                  <Grid3X3 className="h-3 w-3 mr-2" /> Dividir Celda
                </Button>
                
                <div className="h-px bg-white/5 my-1" />

                <Button 
                  variant="ghost" size="sm" 
                  className="justify-start text-xs text-red-500 hover:bg-red-500/10"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                >
                  <Trash className="h-3 w-3 mr-2" /> Eliminar Tabla Completa
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="w-px h-4 bg-white/10 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="text-white/60"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="text-white/60"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}


export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyle.configure(),
      Color.configure(),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      CustomImage,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Escribe el contenido de tu artículo aquí...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'tiptap-content prose prose-invert max-w-none min-h-[400px] p-8 focus:outline-none focus:ring-0 bg-white rounded-b-lg',
      },
    },
  })

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-black/20 focus-within:border-gobai-cyan/50 transition-colors">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <style jsx global>{`
        .tiptap table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .tiptap table td,
        .tiptap table th {
          min-width: 1em;
          border: 2px solid #333;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .tiptap table th {
          font-weight: bold;
          text-align: left;
          background-color: #111;
        }
        .tiptap .selectedCell:after {
          z-index: 2;
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }
        .tiptap .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #adf;
          pointer-events: none;
        }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  )
}
