import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  comments: {
    width: "100%",
    height: "calc(100% - 9rem)",
    overflow: "auto",
    wordWrap: "break-word",
  },
  addComment: {
    width: "100%",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
});
