// import React, { useState } from 'react';
// import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';

// const initialColor = {
//   color: '',
//   code: { hex: '' },
// };

// const ColorList = ({ colors, updateColors, history }) => {
//   const [editing, setEditing] = useState(false);
//   const [colorToEdit, setColorToEdit] = useState(initialColor);
//   const [adding, setAdding] = useState(false);

//   const editColor = (color) => {
//     setEditing(true);
//     setColorToEdit(color);
//   };

//   const saveEdit = (e) => {
//     e.preventDefault();
//     // Make a put request to save your updated color
//     // think about where will you get the id from...
//     // where is is saved right now?
//     axiosWithAuth()
//       .put(`/colors/${colorToEdit.id}`, colorToEdit)
//       .then((res) => {
//         updateColors(
//           colors.map((color) => {
//             return color.id === colorToEdit.id ? res.data : color;
//           })
//         );
//         setEditing(false);
//         setColorToEdit(initialColor);
//       })
//       .catch((err) =>
//         console.log('YOU MESSED SOMETHING UP IN YOUR SAVE EDIT', err)
//       );
//   };

//   const modal = (color) => {
//     confirmAlert({
//       title: 'Confirm Deletion',
//       message: 'Are you sure you want to delete this?',
//       buttons: [
//         { label: 'Yes', onClick: () => deleteColor(color) },
//         {
//           label: 'No',
//           onClick: () => history.push(`/colors`),
//         },
//       ],
//     });
//   };

//   const addColor = () => {
//     setAdding(true);
//     setColorToEdit(initialColor);
//   };

//   const addColorToList = (e) => {
//     e.preventDefault();
//     axiosWithAuth()
//       .post(`http://localhost:5000/api/colors/`, colorToEdit)
//       .then((res) => {
//         console.log('add', res);
//         updateColors(res.data);
//         setAdding(false);
//       });
//   };

//   const deleteColor = (color) => {
//     axiosWithAuth()
//       .delete(`/colors/${color.id}`)
//       .then((res) =>
//         updateColors(colors.filter((colorCheck) => colorCheck.id !== res.data))
//       )
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className='colors-wrap'>
//       <p>colors</p>
//       <ul>
//         {colors.map((color) => (
//           <li key={color.color} onClick={() => editColor(color)}>
//             <span>
//               <span className='delete' onClick={() => modal(color)}>
//                 x
//               </span>{' '}
//               {color.color}
//             </span>
//             <div
//               className='color-box'
//               style={{ backgroundColor: color.code.hex }}
//             />
//           </li>
//         ))}
//       </ul>
//       {editing && (
//         <form onSubmit={saveEdit}>
//           <legend>edit color</legend>
//           <label>
//             color name:
//             <input
//               onChange={(e) =>
//                 setColorToEdit({ ...colorToEdit, color: e.target.value })
//               }
//               value={colorToEdit.color}
//             />
//           </label>
//           <label>
//             hex code:
//             <input
//               onChange={(e) =>
//                 setColorToEdit({
//                   ...colorToEdit,
//                   code: { hex: e.target.value },
//                 })
//               }
//               value={colorToEdit.code.hex}
//             />
//           </label>
//           <div className='button-row'>
//             <button type='submit'>save</button>
//             <button onClick={() => setEditing(false)}>cancel</button>
//           </div>
//         </form>
//       )}
//       {/* <form onClick={() => addColor()} style={{ width: "100%" }}>
//         <h2>Want to add a color?</h2>
//         <input
//           onChange={e =>
//             setAddedColor({ ...addedColor, color: e.target.value })
//           }
//           type='text'
//           placeholder='name'
//           value={addedColor.color}
//         />
//         <input
//           onChange={e =>
//             setAddedColor({ ...addedColor, code: { hex: e.target.value } })
//           }
//           type='text'
//           placeholder='hex'
//           value={addedColor.code.hex}
//         />
//         <button type='submit'>Add Color!</button>
//       </form> */}
//       <form onSubmit={addColorToList}>
//         <legend>Add color</legend>
//         <label>
//           color name:
//           <input
//             onChange={(e) =>
//               setColorToEdit({ ...colorToEdit, color: e.target.value })
//             }
//             value={colorToEdit.color}
//           />
//         </label>
//         <label>
//           hex code:
//           <input
//             onChange={(e) =>
//               setColorToEdit({
//                 ...colorToEdit,
//                 code: { hex: e.target.value },
//               })
//             }
//             value={colorToEdit.code.hex}
//           />
//         </label>
//         <div className='button-row'>
//           <button type='submit'>Add</button>
//           <button onClick={() => setAdding(false)}>cancel</button>
//         </div>
//       </form>
//       <div className='spacer' />
//     </div>
//   );
// };

// export default ColorList;

import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setAdding(false);
    setColorToEdit(color);
  };

  const addColor = () => {
    setAdding(true);
    setColorToEdit(initialColor);
  };

  const addColorToList = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToEdit)
      .then((res) => {
        console.log('add', res);
        updateColors(res.data);
        setAdding(false);
      });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log('edit', res);
        let tmp = colors.map((color) => {
          if (color.id === colorToEdit.id) {
            return res.data;
          } else {
            return color;
          }
        });
        updateColors(tmp);
        setEditing(false);
      })
      .catch((err) => console.log('error', err.response));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then((res) => {
        console.log('delete', res);
        let tmp = colors.filter((col) => col.id !== color.id);
        updateColors(tmp);
      });
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={() => deleteColor(color)}>
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
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <button onClick={addColor}>Add Color</button>
      {adding && !editing && (
        <form onSubmit={addColorToList}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>Add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
