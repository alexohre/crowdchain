export const generateSlug = (title: string) => {
    const randomString = Math.random().toString(36).substring(2, 8); // Generates a random string of 6 characters
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-') // Replaces spaces with hyphens
      .replace(/[^\w-]/g, ''); // Removes non-alphanumeric characters except hyphens
    
    return `${slug}-${randomString}`; // Combine the slug with the random string
  };


  
