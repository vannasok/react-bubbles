import React, { useState } from 'react';

import axiosWithAuth from '../utils/AxiosWithAuth';

const initialColor = {
   color: '',
   code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
   console.log(colors);
   const [editing, setEditing] = useState(false);
   const [colorToEdit, setColorToEdit] = useState(initialColor);
   const [newColor, setNewColor] = useState(initialColor);

   const editColor = color => {
      setEditing(true);
      setColorToEdit(color);
   };

   const saveEdit = e => {
      e.preventDefault();
      // Make a put request to save your updated color
      // think about where will you get the id from...
      // where is is saved right now?
      axiosWithAuth()
         .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
         .then(res => {
            updateColors(
               colors.map(col => {
                  if (col.id === res.data.id) {
                     return res.data;
                  } else {
                     return col;
                  }
               })
            );
            setEditing(false);
            setColorToEdit(initialColor);
         })
         .catch(err => {
            console.log(' save Edit err', err);
         });
   };

   const deleteColor = color => {
      // make a delete request to delete this color

      axiosWithAuth()
         .delete(`http://localhost:5000/api/colors/${color.id}`)
         .then(res => {
            updateColors(colors.filter(col => col.id !== res.data));
         })
         .catch(err => {
            console.log('delete color err', err);
         });
   };
   const addColor = () => {
      axiosWithAuth()
         .post('http://localhost:5000/api/colors', newColor)
         .then(res => {
            updateColors(res.data);
         })
         .catch(err => console.log('add new color err', err));
   };

   return (
      <div className='colors-wrap'>
         <h3>colors</h3>
         <ul>
            {colors.map(color => (
               <li key={color.color} onClick={() => editColor(color)}>
                  <span>
                     <span
                        className='delete'
                        onClick={() => deleteColor(color)}>
                        x
                     </span>{' '}
                     {color.color}
                  </span>
                  <div
                     className='color-box'
                     style={{ backgroundColor: color.code.hex }}
                  />
               </li>
            ))}
         </ul>
         {editing && (
            <form onSubmit={saveEdit}>
               <h4>Edit Color</h4>
               <label>
                  color name:
                  <input
                     onChange={e =>
                        setColorToEdit({
                           ...colorToEdit,
                           color: e.target.value
                        })
                     }
                     value={colorToEdit.color}
                  />
               </label>
               <label>
                  hex code:
                  <input
                     onChange={e =>
                        setColorToEdit({
                           ...colorToEdit,
                           code: { hex: e.target.value }
                        })
                     }
                     value={colorToEdit.code.hex}
                  />
               </label>
               <div className='button-row'>
                  <button type='submit'>Save</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
               </div>
            </form>
         )}
         <form onSubmit={addColor} className='newcolor-wrap'>
            <h4>Add New Color</h4>
            <label>
               color name:
               <input
                  onChange={e =>
                     setNewColor({ ...newColor, color: e.target.value })
                  }
                  name='color'
                  type='text'
                  placeholder='color name'
                  value={newColor.color}
               />
            </label>
            <label>
               hex code:
               <input
                  onChange={e =>
                     setNewColor({ ...newColor, code: { hex: e.target.value } })
                  }
                  name='hex'
                  type='text'
                  placeholder='for example: #xxxxxx'
                  value={newColor.code.hex}
               />
            </label>
            <button className='newcolor-button' type='submit'>
               Add Color
            </button>
         </form>
         <div className='spacer' />
         {/* stretch - build another form here to add a color */}
      </div>
   );
};

export default ColorList;
