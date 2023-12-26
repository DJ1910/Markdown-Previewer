import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
import DOMPurify from "https://cdn.skypack.dev/dompurify@3.0.5";

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.setOptions({
  breaks: true, 
  gfm: true,
  highlight: function (code, lang, callback) {
        return Prism.highlight(code, Prism.languages.javascript, 'javascript')
    }
});

class MarkdownPreviewer extends React.Component {
  constructor(props)
  {
    super(props);
    this.state= {isEditorSmall: true, isPreviewerSmall: true, inputText: `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`};
    this.toggleEditorWindow = this.toggleEditorWindow.bind(this);
    this.togglePreviewerWindow = this.togglePreviewerWindow.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
  }
  
  toggleEditorWindow() {
    this.setState((state) => ({isEditorSmall: !state.isEditorSmall}));
  }
  
  togglePreviewerWindow() {
    this.setState((state) => ({isPreviewerSmall: !state.isPreviewerSmall}));
  }
  
  updateInputText(event) {
    this.setState({inputText: event.target.value});
  }
  
  render() 
  {  
    return (
      <div id="wrapper">
        <div id="input" style= {{display: this.state.isPreviewerSmall ? 'flex' : 'none'}}>
          <div className="titlebar">
          <span className="title">
            <i className="fa fa-free-code-camp" />
            <h3>Editor</h3>
          </span>
          <button onClick= {this.toggleEditorWindow}><i className= {this.state.isEditorSmall ? "fa fa-arrows-alt" : "fa fa-compress"} /></button>
          </div>
          <textarea id="editor" style= {{minHeight: this.state.isEditorSmall ? '200px' : '90vh'}} onChange= {this.updateInputText} value= {this.state.inputText}></textarea>
        </div>    
        <div id="output" style= {{display: this.state.isEditorSmall ? 'flex' : 'none'}}>
          <div className="titlebar">
          <span className="title">
            <i className="fa fa-free-code-camp" />
            <h3>Previewer</h3>
          </span>
          <button onClick= {this.togglePreviewerWindow}><i className= {this.state.isPreviewerSmall ? "fa fa-arrows-alt" : "fa fa-compress"} /></button>
          </div>
          <span id="preview" style= {{minHeight: this.state.isPreviewerSmall ? '150px' : '90vh'}} dangerouslySetInnerHTML= {{__html: DOMPurify.sanitize(marked.parse(this.state.inputText, {renderer: renderer}), {ADD_ATTR: ['target']})}}> 
          </span>
        </div>    
      </div>
    );
  }
}

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('target'));
