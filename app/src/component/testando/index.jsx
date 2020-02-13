import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { actionHub, services, components } from '../../loader'
import styled from 'styled-components'



const localData = 'Essa veio localmente.'

export default () =>
{
    const dispatch = useDispatch()
    const { selector } = services.testando


    const user = useSelector(state => selector.getUser(state))
    const XO = useSelector(state => selector.getXO(state))

    const onFetchFromLocal = () => dispatch(actionHub.TESTANDO_FROM_LOCAL(localData))
    const onFetchFromApi = () => dispatch(actionHub.TESTANDO_FROM_API())

    const onReload = () => window.location.reload()
    

    return (
        <components.Box>

            <h3> Data </h3>
            <ul>
                <li>
                    <h4> User </h4>
                    {user}
                </li>
                <li>
                    <h4> XO </h4>
                    {XO}
                </li>
            </ul>

            <Divider />

            <ButtonStyled onClick={() => onFetchFromLocal()}>
                Fetch Localmente
            </ButtonStyled>

            <ButtonStyled onClick={() => onFetchFromApi()}>
                Fetch da API
            </ButtonStyled>

            <ButtonStyled variant='contained' onClick={() => onReload()}>
                Restart the App
            </ButtonStyled>

        </components.Box>
    )
}

const ButtonStyled = styled(Button)`
    margin: 12;
`