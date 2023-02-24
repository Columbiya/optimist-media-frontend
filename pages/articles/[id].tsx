import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppContainer } from "@/components/AppContainer/AppContainer";
import { MainLayout } from "@/layouts/MainLayout";
import { Article } from "@/models/Article";
import { Box, Button, Center, Container, Divider, Heading, Image, Text, Icon, useBoolean, Flex } from "@chakra-ui/react";
import { BsFillHeartFill } from 'react-icons/bs'
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "../_app";
import { CheckResponse, useAuthStore } from '@/store/authStore';
import { ViewIcon } from '@chakra-ui/icons'
import { EditorOutput, possibleBlocks } from '@/utils/editor-output';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const promises = await Promise.allSettled([
        axios.get<Article>(`http://localhost:5000/api/articles/${context.query?.id}`).then(res => res.data),
        axios.put<{views: number}>(`http://localhost:5000/api/articles/${context.query.id}`).then(res => res.data),
        axios.post<{likesAmount: number}>(`http://localhost:5000/api/articles/get-likes-amount/${context.query.id}`).then(res => res.data),
    ])

    if (promises[0].status === 'fulfilled' && promises[1].status === 'fulfilled' && promises[2].status === 'fulfilled') {
        const data = promises[0].value
        const viewsObject = promises[1].value
        const likesAmount = promises[2].value.likesAmount

        return {
            props: {
                id: data.id,
                title: data.title,
                text: JSON.parse(data.text),
                subjectId: data.subjectId,
                userId: data.userId,
                articleImage: data.articleImage,
                views: viewsObject.views,
                likes: likesAmount
            }
        }
    }
    else {
        return {
            props: {
                errored: true
            }
        }
    }

}

const parseElement = (element: possibleBlocks) => {
}

type ArticleDetailsProps = Omit<Article, 'text'> & {likes: number} & {text: EditorOutput}

const ArticleDetails: NextPageWithLayout<ArticleDetailsProps> = ({ id, subjectId, text, title, userId, articleImage, views, likes: articleLikes }) => {
    const [liked, setLiked] = useBoolean(false)
    const [likes, setLikes] = useState(articleLikes)
    const { user } = useAuthStore()
    const parsedContents = useMemo(() => {
        // text.blocks.map()
    }, [])

    console.log(articleImage)

    const onArticleLike = useCallback(async () => {
        if (!user) return
         
        try {
            if (!liked) {
                await axios.post<CheckResponse>('http://localhost:5000/api/articles/like', {userId: user?.id, articleId: id}).then(res => res.data)

                setLiked.on()
                setLikes(l => l + 1)
            }
            else {
                await axios.post<CheckResponse>('http://localhost:5000/api/articles/unlike', {userId: user?.id, articleId: id}).then(res => res.data)

                setLiked.off()
                setLikes(l => l - 1)
            }
        } catch(e) {
            console.log(e)
        }
    }, [liked, user, id, setLiked])

    useEffect(() => {
        async function getLiked() {
            if (!user) return

            try {
                await axios.post<CheckResponse>('http://localhost:5000/api/articles/get-like', {userId: user?.id, articleId: id}).then(res => res.data)

                setLiked.on()
            } catch(e) {
                console.log(e)
                setLiked.off()
            }
        }

        getLiked()
    }, [user, id, setLiked])

    return (
         <>
            <AppContainer>
                <Box pos="relative" maxW={500} minH={300} w="100%" margin="0 auto">
                    <Image src={`http://localhost:5000/${articleImage}`} alt={title} />
                </Box>

                <Center mt={50} pb={50}>
                    {/* {text.blocks.map(e => )} */}
                </Center>

            </AppContainer>

            <Container maxW="1600">
                <Divider />
            </Container>

            <AppContainer>
                <Flex justifyContent="flex-end" alignItems="center" mt={50}>
                    <Button mr={25} cursor="default">
                        <Icon as={ViewIcon} mr={3} />
                        <Text>{views}</Text>
                    </Button>

                    <Button onClick={onArticleLike}>
                        <Icon as={BsFillHeartFill} transition="color .5s ease" color={liked ? "red": "white"} mr={3} />
                        {likes}
                    </Button>
                </Flex>

            </AppContainer>
         </>

    )
}

ArticleDetails.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default ArticleDetails