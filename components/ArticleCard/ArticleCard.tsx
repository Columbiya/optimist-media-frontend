import { ROUTES } from "@/utils/ROUTES"
import { Button, Card, CardBody, CardHeader, GridItem, Heading, useBoolean } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Article } from '../../models/Article'

type ArticleCardProps = Article

export const ArticleCard: React.FC<ArticleCardProps> = ({ id, subjectId, text, title, userId, articleImage }) => {
    const [isHovering, setHovering] = useBoolean()
    const router = useRouter()

    return (
        <GridItem onMouseEnter={setHovering.on} onMouseLeave={setHovering.off} cursor="pointer" onClick={() => router.push(ROUTES.ARTICLES + `/${id}`)}>
            <Card h="100%">
                <CardHeader style={{position: 'relative', overflow: 'hidden'}} w="100%" height="300px">
                    <Image 
                        src={articleImage ? `http://localhost:5000/${articleImage}`: ""} 
                        alt={title} 
                        fill
                        style={{objectFit: 'cover', transition: 'transform .5s ease', transform: isHovering ? "scale(1.3)": 'none'}}
                    />
                </CardHeader>
                <CardBody>
                    <Heading size='md'>{title}</Heading>

                    <Button mt={15}>Подробнее</Button>
                </CardBody>
            </Card>
        </GridItem>
    )
}