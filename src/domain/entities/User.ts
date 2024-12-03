/**
 * Represents the data of a single user.
 */
export interface UserData {
    /**
     * The unique identifier for the user.
     */
    id: number;
  
    /**
     * The email address of the user.
     */
    email: string;
  
    /**
     * The first name of the user.
     */
    first_name: string;
  
    /**
     * The last name of the user.
     */
    last_name: string;
  
    /**
     * The URL of the user's avatar image.
     */
    avatar: string;
  }
  
  /**
   * Represents a paginated list of users.
   */
  export interface UserList {
    /**
     * The current page number (1-indexed).
     */
    page: number;
  
    /**
     * The number of users displayed per page.
     */
    per_page: number;
  
    /**
     * The total number of users across all pages.
     */
    total: number;
  
    /**
     * The total number of pages available.
     */
    total_pages: number;
  
    /**
     * An array containing the user data for the current page.
     */
    data: UserData[];
  }
  
  /**
   * Represents support information related to the users or the API.
   */
  export interface UserSupport {
    /**
     * The URL for additional support or documentation.
     */
    url: string;
  
    /**
     * A descriptive text message providing support information.
     */
    text: string;
  }
  
  /**
   * Represents the basic information for creating or updating a user.
   */
  export interface User {
    /**
     * The name of the user.
     */
    name: string;
  
    /**
     * The job title or role of the user.
     */
    job: string;
  }
  