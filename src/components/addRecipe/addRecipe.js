/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import './addRecipe.scss';
import { useNavigate } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Embed from '@editorjs/embed';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import toastMsg from '../../helperFunctions/toast';
import fetchURL from '../../helperFunctions/fetch';

export default function AddRecipe() {
  const [previewSource, setPreviewSource] = useState('');
  const recipeEditor = useRef(null);
  const ingredientListEditor = useRef(null);
  const recipeTitleEditor = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    recipeTitleEditor.current = new EditorJS({
      holder: 'recipeTitle',
      placeholder: 'Recipe Title...',
      defaultBlock: 'paragraph',
    });

    recipeEditor.current = new EditorJS({
      holder: 'recipe',
      placeholder: 'Enter recipe here...',
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a heading',
            levels: [2, 3],
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
      },
    });

    ingredientListEditor.current = new EditorJS({
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

  const postRecipeData = async () => {
    const recipeTitleEditorData = await recipeTitleEditor.current.save();
    const recipeEditorData = await recipeEditor.current.save();
    const ingredientListEditorData = await ingredientListEditor.current.save();
    if (!recipeTitleEditorData.blocks.length
      || !recipeEditorData.blocks.length
      || !ingredientListEditorData.blocks.length
      || !previewSource.length) {
      alert('Please fill in all the details');
    } else {
      const { result } = await fetchURL('/recipes', 'POST', {
        title: recipeTitleEditorData,
        ingredients: ingredientListEditorData,
        recipe: recipeEditorData,
        image: previewSource,
      });
      if (result.id) {
        navigate(`/recipes/${result.id}`);
      } else {
        toastMsg('error', result.message);
      }
    }
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const closeImageInput = () => {
    setPreviewSource('');
  };

  return (
    <div className="cook main">
      <div id="recipeTitle" />
      {
        previewSource
          ? (
            <div id="recipeImage">
              <div style={{ position: 'relative' }}>
                <AiOutlineCloseCircle size="32px" id="ImageCross" onClick={closeImageInput} />
                <img src={previewSource} alt="RecipeImage" />
              </div>
            </div>
          )
          : (
            <div className="InputImageContainer">
              <button type="button" onClick={() => document.getElementById('inputImage').click()}>Upload Recipe Image</button>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="image"
                onChange={handleImageInput}
                style={{ display: 'none' }}
                id="inputImage"
              />
            </div>
          )
      }
      <div className="recipeData">
        <div id="ingredientList" />
        <div id="recipe" />
      </div>
      <button type="button" onClick={postRecipeData} id="postRecipe">Post recipe</button>
    </div>
  );
}
