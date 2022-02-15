/* ------------------ Import ------------------ */
const fs = require('fs');

/* -------------------------------------------- */
/*                Declarar clase                */
/* -------------------------------------------- */

// eslint-disable-next-line no-unused-vars
class Container {


  /* --------------- Constructor -------------- */
  constructor(fileDir){
    this.fileDir = fileDir;
    this.init();
  }

  /* ---------------- Function ---------------- */

  /* --------------- Initialize --------------- */
  init() {
    /* ------------------ Import ------------------ */
    const fs = require('fs');
    fs.writeFile(this.fileDir,'',error=> {if (error) {throw error}});
  }

  /* ------------------ Save ------------------ */
  save(data) {
    let assignedId = "Id not assigned";
    fs.readFile(this.fileDir,'utf8',(error,contenido)=>{
      let newData = data;
      if (error) {
        newData['id'] = 1;
        fs.writeFile(this.fileDir,JSON.stringify(newData),error=>{
          if (error){
            console.log('New file NOT written!');
          } else {
            console.log("New file successfully written!");
            assignedId = 1;
          }
      });
      } else {
        const jsonData = JSON.parse(contenido);
        const lastItem = jsonData[jsonData.length-1];
        const lastId = lastItem['id'];
        newData['id'] = lastId + 1;
        let jsonNewData = jsonData;
        jsonNewData.push(newData);
        fs.writeFile(this.fileDir,JSON.stringify(jsonNewData),error=>{
          if (error){
            console.log('New file NOT overwritten!');
          } else {
            console.log("File successfully overwritten!");
            assignedId = lastId + 1;
          }
        });
      }
    });
    return assignedId;
  }

  /* ---------------- Get by Id --------------- */
  async getById(id) {
    let filteredData
    fs.readFile(this.fileDir,'utf8', (error,contenido) => {
      if (error) {
        console.log('Object NOT retrieved!');
      } else {
        const jsonData = JSON.parse(contenido);
        filteredData = jsonData.filter(element => element["id"] === id);
        console.log('Object successfully retrieved!');
      }
    });
    return filteredData;
  }

  /* ----------------- Get all ---------------- */
  async getAll() {
    let allData;
    fs.readFile(this.fileDir,'utf8', (error,contenido) => {
      if (error) {
        console.log('Array NOT retrieved!');
      } else {
        allData = JSON.parse(contenido);
        console.log('Array successfully retrieved!');
        return allData;
      }
    });
  }

  /* -------------- Delete by ID -------------- */
  async deleteById(id) {
    let newData;
    fs.readFile(this.fileDir,'utf8', (error,contenido) => {
      if (error) {
        console.log('File NOT read!');
      } else {
        const jsonData = JSON.parse(contenido);
        newData = jsonData.filter(element => element['id'] != id);
        fs.writeFile(this.fileDir,JSON.stringify(newData),error=>{
          if (error){
            console.log('File NOT overwritten with removals!');
          } else {
            console.log("File successfully overwritten with removals!");
          }
        });
      }
    });
  }

  /* --------------- Delete all --------------- */
  async deleteAll() {
    fs.unlink(this.fileDir, error => {
      if (error) {
        console.log('File NOT deleted!')
      }
    });
  }
}

module.exports = Container