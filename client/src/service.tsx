import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';


export type Question = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  confirmed_answer: boolean;
  user_id: number;
}; 


export type Tag = {
  name: string;
  tag_id: number;
};

export type tag_question_relation = {
  question_id: number;
  tag_id: number;
};



class Service {

  /**
   * Get all questions. 
   */

  getAllQuestions() {
    return axios.get<Question[]>('/questions').then((response) => response.data);
  }

  /**
   * Get a question by id.
   */

  getQuestion(id: number) {
    return axios.get<Question[]>('/questions/' + id).then((response) => response.data);
  }

  /**
   * Get top five questions.
   */

  getTopFiveQuestions() {
    return axios.get<Question[]>('/topfive').then((response) => response.data);
  }

  /**
   * Update a question.
   */

  updateQuestion(question: Question) {
    return axios
      .put<Question>('/questions/' + question.question_id, { question: question })
      .then((response) => response.data);
  }

  /**
   * Create a question.
   */

  createQuestion(question: Question) {
    return axios
      .post<Question>('/questions', { question: question })
      .then((response) => response.data);
  }

  /**
   * Delete a question.
   */
  
  deleteQuestion(id: number) {
    return axios.delete<Question>('/questions/' + id).then((response) => response.data);
  }


  /**
   * Get tags for a question.
   */

  getTags(id: number) {
    return axios.get('/questions/' + id + '/tags').then((response) => response.data);
  }

  /**
   * Add a tag to a question.
   */

  addTag(id: number, tag: string) {
    return axios
      .post('/questions/' + id + '/tags', { tag: tag })
      .then((response) => response.data);
  }

  /**
   * Delete a tag from a question.
   */

  deleteTag(id: number, tag: string) {
    return axios
      .delete('/questions/' + id + '/tags/' + tag)
      .then((response) => response.data);
  }



  /**
   * Get all tags.
   */

  getAllTags() {
    return axios.get('/tags').then((response) => response.data);
  }

}

// class Service1 {
//   /**
//    * Get all tasks.
//    */
//   getAllRepice() {
//     return axios.get<Recipe[]>('/').then((response) => response.data);
//   }

//   getRecipe(id: number) {
//     return axios.get<Recipe[]>('/recipe/' + id).then((response) => response.data);
//   }
//   getRecipeContent(id: number) {
//     return axios.get<Recipe_Content[]>('/recipecontent/' + id).then((response) => response.data);
//   }
//   getAllCountry() {
//     return axios.get<Country[]>('/country').then((response) => response.data);
//   }
//   getAllCategory() {
//     return axios.get<Category[]>('/category').then((response) => response.data);
//   }
//   getAllIngredient() {
//     return axios.get<Ingredient[]>('/ingredient').then((response) => response.data);
//   }
//   getShoppingList() {
//     return axios.get<List[]>('/shoppinglist').then((response) => response.data);
//   }
//   /* addItemToShoppingList(item: ElementShoppingList) {
//     return axios.post<{}>('/additemshoppinglist', {item: item}).then((response) => response.data);
//   } */
//   addIngredient(ingredient: List) {
//     return axios
//       .post<{}>('/addingredient', { ingredient: ingredient })
//       .then((response) => response.data);
//   }
//   getAllIceboxIngredients() {
//     return axios.get<IceboxIngredient[]>('/icebox').then((response) => response.data);
//   }
//   getAllRecipeContent() {
//     return axios.get<Recipe_Content[]>('/recipecontent').then((response) => response.data);
//   }
//   deleteIceboxIngredient(ingred_id: number) {
//     return axios
//       .delete<IceboxIngredient>('/deleteiceboxingredient/' + ingred_id)
//       .then((response) => response.data);
//   }
//   createIngredient(name: string) {
//     return axios.post<{}>('/newingredient', { name: name }).then((response) => response.data);
//   }

//   createCountry(name: string) {
//     return axios.post<{}>('/newcountry', { name: name }).then((response) => response.data);
//   }
//   createCategory(name: string) {
//     return axios.post<{}>('/newcategory', { name: name }).then((response) => response.data);
//   }

//   createRecipe(recipe: Recipe) {
//     return axios
//       .post<{ id: number }>('/createrecipe', { recipe: recipe })
//       .then((response) => response.data.id);
//   }

//   addIngredientToIcebox(selectedIceboxIngredient: IceboxIngredient) {
//     return axios
//       .post<{}>('/addingredienttoicebox', { selectedIceboxIngredient: selectedIceboxIngredient })
//       .then((response) => response.data);
//   }

//   createRecipeIngredient(recipe_content: Recipe_Content[]) {
//     return axios
//       .post<Recipe_Content>('/create_recipe_ingredient', { recipe_content: recipe_content })
//       .then((response) => response.data);
//   }
//   updateRecipeIngredient(recipeContent: Recipe_Content[]) {
//     return axios
//       .put('/update_recipe_ingredient', { recipeContent: recipeContent })
//       .then((response) => response.data);
//   }
//   updateIngredientShoppingList(ingredient: List) {
//     return axios
//       .put<{}>('/updateingredient', { ingredient: ingredient })
//       .then((response) => response.data);
//   }
//   deleteIngredientShoppingList(id: number) {
//     return axios
//       .delete<{}>('/deleteingredientshoppinglist/' + id)
//       .then((response) => response.data);
//   }
//   deleteAllShoppingList() {
//     return axios.delete<{}>('/deleteallshoppinglist').then((response) => response.data);
//   }
//   updateRecipe(recipe: Recipe) {
//     return axios
//       .put('/update_recipe/' + recipe.oppskrift_id, { recipe: recipe })
//       .then((response) => response.data);
//   }
//   deleteIngredient(recipe_id: number, ingred_id: number) {
//     return axios
//       .delete<Recipe_Content>('/deleteingredient/' + recipe_id + '/' + ingred_id)
//       .then((response) => response.data);
//   }
//   deleteRecipe(id: number) {
//     return axios.delete<Recipe_Content>('/deleterecipe/' + id).then((response) => response.data);
//   }
//   likeRecipe(oppskrift_id: number, liked: boolean) {
//     return axios
//       .put<{}>('/recipelike/' + oppskrift_id, { liked: liked })
//       .then((response) => response.data);
//   }
// }

const service = new Service();
export default service;
