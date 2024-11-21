import React from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';

const CommentTextField = styled(TextField)`
    margin-top: 10px;
    width: 100%;
`;

const CommentSection = ({
    comment,
    onCommentChange,
}: {
    comment: string;
    onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <CommentTextField
        label="Коментар"
        variant="outlined"
        multiline
        rows={3}
        value={comment}
        onChange={onCommentChange}
        placeholder="Додай коментар..."
    />
);

export default CommentSection;
