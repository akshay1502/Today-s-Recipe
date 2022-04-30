import React, { useEffect } from 'react';
import './addRecipe.scss';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Embed from '@editorjs/embed';
// eslint-disable-next-line import/no-extraneous-dependencies
import Checklist from '@editorjs/checklist';

export default function AddRecipe() {
  let recipeEditor;
  let ingredientListEditor;
  let recipeTitleEditor;
  useEffect(() => {
    recipeTitleEditor = new EditorJS({
      holder: 'recipeTitle',
      placeholder: 'Recipe Title...',
      defaultBlock: 'paragraph',
    });

    recipeEditor = new EditorJS({
      holder: 'recipe',
      placeholder: 'Enter recipe here...',
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a heading',
            levels: [1, 2, 3],
            defaultLevel: 2,
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              facebook: true,
              instagram: true,
              twitter: true,
            },
          },
          inlineToolbar: true,
        },
        Checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
      },
    });

    ingredientListEditor = new EditorJS({
      holder: 'ingredientList',
      placeholder: "Ingredient List (use 'List' tool)",
      tools: {
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
      },
    });
  }, []);
  const storeRecipeData = () => {
    recipeTitleEditor.save().then((data) => console.log(data));
    recipeEditor.save().then((data) => console.log(data));
    ingredientListEditor.save().then((data) => console.log(data));
  };

  return (
    <div className="cook">
      <div id="recipeTitle" />
      <div className="InputImageContainer">
        <button type="button" onClick={() => document.getElementById('inputImage').click()}>Upload Recipe Image</button>
        <input type="file" style={{ display: 'none' }} id="inputImage" />
      </div>
      <div className="recipeData">
        <div id="ingredientList" />
        <div id="recipe" />
      </div>
      <button type="button" onClick={storeRecipeData} id="postRecipe">Post recipe</button>
    </div>
  );
}
