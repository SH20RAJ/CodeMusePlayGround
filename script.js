const htmlInput = CodeMirror.fromTextArea(document.getElementById('html-input'), {
  mode: 'htmlmixed',
  theme: 'default',
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  extraKeys: {
    'Ctrl-Space': 'autocomplete'
  },
  hintOptions: {
    hint: CodeMirror.hint.html,
    completeSingle: false
  }
});

const cssInput = CodeMirror.fromTextArea(document.getElementById('css-input'), {
  mode: 'css',
  theme: 'default',
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
});

const jsInput = CodeMirror.fromTextArea(document.getElementById('js-input'), {
  mode: 'javascript',
  theme: 'default',
  lineNumbers: true,
  lineWrapping: true,
  autoCloseBrackets: true,
});

const resultFrame = document.getElementById('result-frame');

// Restore code from localStorage if available
const storedHtmlCode = localStorage.getItem('htmlCode');
const storedCssCode = localStorage.getItem('cssCode');
const storedJsCode = localStorage.getItem('jsCode');

htmlInput.setValue(storedHtmlCode || '');
cssInput.setValue(storedCssCode || '');
jsInput.setValue(storedJsCode || '');

function updatePreview() {
  const htmlCode = htmlInput.getValue();
  const cssCode = `<style>${cssInput.getValue()}</style>`;
  const jsCode = `<script>${jsInput.getValue()}</script>`;

  const combinedCode = `${htmlCode}${cssCode}${jsCode}`;
  resultFrame.srcdoc = combinedCode;

  // Store code in localStorage
  localStorage.setItem('htmlCode', htmlCode);
  localStorage.setItem('cssCode', cssInput.getValue());
  localStorage.setItem('jsCode', jsInput.getValue());
}

htmlInput.on('change', updatePreview);
cssInput.on('change', updatePreview);
jsInput.on('change', updatePreview);
