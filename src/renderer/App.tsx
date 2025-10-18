import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const App: React.FC = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: false,
      height: '100%',
      width: 'auto',
      storageManager: { autoload: false },
      plugins: [],
      pluginsOpts: {}
    });

    editor.BlockManager.add('hero-block', {
      label: 'Hero',
      content: `<section class="hero">
        <div class="container">
          <h1>Salut</h1>
          <p>Acesta este un bloc Hero</p>
        </div>
      </section>`,
      category: 'Sections'
    });

    return () => editor.destroy();
  }, []);

  return (
    <div style={{height: '100%'}}>
      <header style={{height: 48, background: '#222', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 12px'}}>
        <strong>Aplicatie - Editor WYSIWYG</strong>
      </header>
      <div id="gjs" />
    </div>
  );
};

export default App;