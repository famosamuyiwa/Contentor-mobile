interface Media{
    id: string
    userId: string
    fileType: string
    url: string
    createdAt: string
    description?: string
    coverUrl?: string    
}

interface MediaUpload{
    userId: string
    fileType: string
    url: string
    createdAt: string
    description?: string
    coverUrl?: string    
}