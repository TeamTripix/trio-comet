import TrioCometLoader from '@components/TrioCometLoader'
import { useMediaQuery } from 'react-responsive'

const MobileView = ({ children, loader }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isMobile = useMediaQuery({ query: "(min-width: 0px) and (max-width: 786px)" })
    if (isDesktop) {
        return children
    }
    if (isMobile) {
        return children
    }

    if (!!loader) {
        return <TrioCometLoader/>
    } else {
        return ""
    }
}

export default MobileView