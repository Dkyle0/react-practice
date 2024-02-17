export const transformComment = (dbPost) => ({
	id: dbPost.id,
	postId: dbPost.post_id,
	authorId: dbPost.author_id,
	content: dbPost.content,
	publishedAt: dbPost.published_at,
});
