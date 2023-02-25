import { ProfileImage } from "@/components/ProfileImage/ProfileImage"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { createRef } from 'react'

describe('profile image', () => {
    test('should display icon when hovering over image', () => {
        render(<ProfileImage imageFixedWidth={true} fileInputRef={createRef()} />)

        const image = screen.getByTestId('profile-photo')
        const downloadIcon = screen.getByTestId('download-icon')

        expect(image).toBeInTheDocument()

        act(() => {
            fireEvent.mouseEnter(image)
        })

        expect(image).toHaveStyle({opacity: 0.7})
        expect(downloadIcon).toHaveStyle({opacity: 1})

        act(() => {
            fireEvent.mouseLeave(image)
        })

        expect(image).toHaveStyle({opacity: 1})
        expect(downloadIcon).toHaveStyle({opacity: 0})
    })

    test('triggers click on the input ref', () => {
        const refClickMock = jest.fn()
        render(<ProfileImage imageFixedWidth={true} fileInputRef={{current: {click: refClickMock}}} />)

        const photoContainer = screen.getByTestId('photo-container')

        expect(photoContainer).toBeInTheDocument()

        act(() => {
            fireEvent.click(photoContainer)
        })

        expect(refClickMock).toHaveBeenCalled()
    })
})