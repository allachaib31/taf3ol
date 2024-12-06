import { useState } from 'react';
import RichTextEditor, { 
    BaseKit, Blockquote, Bold, BulletList, Clear, Code, CodeBlock, Color, 
    FontFamily, FontSize, FormatPainter, Heading, Highlight, 
    History, HorizontalRule, Iframe, Image, Indent, Italic, LineHeight, 
    Link, MoreMark, MultiColumn, OrderedList, SlashCommand, 
    Strike, Table, TaskList, TextAlign, 
    Underline, Video, SearchAndReplace, Emoji, Katex, ExportPdf, ImportWord, 
    ExportWord, TableOfContents, Excalidraw, TextDirection, Mention, Attachment, 
    ImageGif, Mermaid, Twitter 
} from 'reactjs-tiptap-editor';

// Import CSS
import 'reactjs-tiptap-editor/style.css';

const extensions = [
    BaseKit.configure({
        // Show placeholder
        placeholder: {
            showOnlyCurrent: true,
        },

        // Character count
        characterCount: {
            limit: 50_000,
        },
    }),
    Blockquote,
    Bold,
    BulletList,
    Clear,
    Code,
    CodeBlock,
    Color,
    FontFamily,
    FontSize,
    FormatPainter,
    Heading,
    Highlight,
    History,
    HorizontalRule,
    Iframe,
    Image,
    Indent,
    Italic,
    LineHeight,
    Link,
    MoreMark,
    MultiColumn,
    OrderedList,
    SlashCommand,
    Strike,
    Table,
    TaskList,
    TextAlign,
    Underline,
    Video,
    SearchAndReplace,
    Emoji,
    Katex,
    ExportPdf,
    ImportWord,
    ExportWord,
    TableOfContents,
    Excalidraw,
    TextDirection,
    Mention,
    Attachment,
    ImageGif,
    Mermaid,
    Twitter,
    TextDirection.configure({
        // Set text direction to RTL for Arabic text
        direction: 'auto',
    }),
];


const Editor = ({ content, setContent }) => {

    const onChangeContent = (value) => {
        setContent(value);
    };

    return (
        <RichTextEditor
            output='html'
            content={content}
            dark={false}
            onChangeContent={onChangeContent}
            extensions={extensions}
        />
    );
};

export default Editor;
