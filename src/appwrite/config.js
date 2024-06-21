import conf from "../conf/conf";
import { Client, ID, Databases ,Query , Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    } 

    async createPost({title, slug, content, featuredImage, status, userId, authorName}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  // Using slug as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    authorName  // Added authorName field
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;  // Rethrow the error so it can be handled by the caller
        }
    }

    async updatePost(documentId, { title, content, featuredImage, status, authorName }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,  // Ensure this is the actual document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    authorName  // Added authorName field
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;  // Rethrow the error so it can be handled by the caller
        }
    }


    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    async getPosts() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    async getAllPosts() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    

    // file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), 
                file
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            ) 
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
            return false
        }
    }
}

const service = new Service()

export default service