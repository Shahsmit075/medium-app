import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign ,decode} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common"

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
        JWT_SECRET : string;
	},
    Variables : {
		userId: string;
	}
}>();


blogRouter.use('*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	// const token = jwt.split(' ')[1];
	const payload = await verify(jwt, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

	c.set('userId', payload.id as string);
	await next()
})

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({ error: "Invalid input" });
        }

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(userId)  // this is passed doewn
            }
        });
        return c.json({
            id: blog.id
        });
    }  catch (e) {
        c.status(403);
        return c.json({ error: "error while updating blog" });
    }
})


blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try	{
        const body = await c.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({ error: "Invalid input" });
        }
          // Check if body contains the id, title, and content
        if (!body.id || !body.title || !body.content) {
            c.status(400);
            return c.json({ error: "Blog ID, title, and content are required for updating" });
        }

        const currentBlog = await prisma.blog.findUnique({
            where: { id: Number(body.id) },
        });
        console.log('Current blog data:', currentBlog);

        console.log('Received body:', body);
        console.log('UserId from context:', userId);

        const updatedBlog = await prisma.blog.update({
            where: {
                id: Number(body.id),
                authorId: Number(userId)
            },
            data: {
                title: body.title,
                content: body.content
            }
	    });
        console.log('Updated blog:', updatedBlog);

        // If the blog is updated, return the updated blog info
        return c.json({ message: `Updated blog ${body.id}`, updatedBlog });

    } catch (e) {
        console.error('Error while updating blog:', e);
        
        c.status(403);
        return c.json({ error: "Error while updating blog" });
    }
});

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.blog.findMany({});

	return c.json(blogs);
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
        const blog = await prisma.blog.findUnique({
		where: {
			id : Number(id)
		}
	    });
	return c.json(blog);
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while updating blog" });
    }
    })

