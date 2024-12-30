import DesignInterface from './components/interfaces/DesignInterface'

let designs:Record<string,DesignInterface> = {
}

const designpath = require.context("./designs", true, /.+\/design$/);
designpath.keys().forEach((filename: string) => {
    const designname = filename.split("/")[1]
    if (process.env['REACT_APP_DESIGN_' + designname + '_DISABLE'] != "true") {
      designs[designname] = designpath(filename).default
    }
  });



export default designs
