import React from 'react';
import MyEditor from '../editor/editor';
import './addRecipe.scss';

export default function AddRecipe() {
  return (
    <div className="cook">
      <input type="text" name="recipeTitle" id="recipeTitle" placeholder="Recipe Title..." />
      <div className="InputImageContainer">
        <button type="button" onClick={() => document.getElementById('inputImage').click()}>Upload Recipe Image</button>
        <input type="file" style={{ display: 'none' }} id="inputImage" />
      </div>
      <MyEditor />
    </div>
  );
}
