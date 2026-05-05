During our initial experimentation of Qwen 3-Max Model to generate image ad creatives for brands, we came across an issue where GenAI performed poorly in generating images where there was text in the image itself as these text tend to be jumbled up or misspelt. However, in the advertising sector, most brand visuals and advertisements include text in images (Figure 1, 2). 

We thought of a workflow or pipeline that could help to fix this issue.
Step 1: The creative director of the company would input the detailed prompt to Qwen (Text to Image Model) to generate the initial iteration of the advertisement. (Figure 3)
Step 2: Now, this creative director could simply go through an eyeball check to see if the text in the image is spelt correctly and is not jumbled up. However, we made it more feasible with less human involvement to automate the whole process especially when mass producing advertisements. The creative director could instead upload the advertisement initially produced in Step 1 to Qwen Text+Image to Text Model and prompt it to find all words in the exact spellings as in the image. Essentially this can be any OCR (Optical Character Recognition) technology. However, we kept to Qwen to stay in the same ecosystem. (Figure 4) 

Step 3: We now take the words provided in Step 2 to Qwen Text to Text Model and prompt it for misspellings or jumbled text in the output. Qwen will provide a binary response and if there are misspellings it will mention the words that are misspelt or jumbled. If there are no misspellings, we can return the created advertisement back to the creative director. (Figure 4) 

Step 4: However, if we the words are misspelt and which ones are, we can pass in the initial advertisement generated in Step 1 to Qwen Image Edit Model and prompt it to change those respective words that are misspelt in the image (obtained from Step 3) and output the regenerated edited image. Now Step 4 will provide iteration 2 of the advertisement. (Figure 5)

However we cannot guarantee that Step 4 will once again produce an advertisement with corrected text in image. Hence, the pipeline only ends once we run through Step 2 and 3 again with the Iteration 2 ad-creative (Figure 6) and Qwen informs us that there are no misspellings. If there once again is, we continue Step 4 for Iteration 3. This process repeats and this entirety encapsulates the workflow (Figure 7) to avoid misspelt text in image when generating advertisements. Based on internal tests, the workflow lowered the average rate of misspelt text in ads from approximately 30% to under 5% across 50 test samples, while maintaining visual fidelity.

We managed to solve a real issue to Image in text being jumbled on misspelt and this 4 steps can be applicable to any image generation model.

