import * as ts from 'typescript';

function getLeadingCommentsTrivia(node: ts.Node, sourceFile: ts.SourceFile): readonly ts.CommentRange[] {
  // Get the position of the node (including comments)
  const nodePos = node.pos;

  // Retrieve the trivia
  return ts.getLeadingCommentRanges(sourceFile.text, nodePos) || [];
}

function containsMagic(triviaText: string): boolean {
  const magicPattern = /@magic/;
  return triviaText.match(magicPattern) !== null;
}

function getAllCommentRanges(sourceFile: ts.SourceFile): readonly ts.CommentRange[] {
  const commentRanges: ts.CommentRange[] = [];
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, undefined, sourceFile.text);

  let token: ts.SyntaxKind;
  do {
    token = scanner.scan();
    if (token === ts.SyntaxKind.MultiLineCommentTrivia || token === ts.SyntaxKind.SingleLineCommentTrivia) {
      const range = {
        kind: token,
        pos: scanner.getTokenPos(),
        end: scanner.getTextPos(),
      };
      commentRanges.push(range);
    }
  } while (token !== ts.SyntaxKind.EndOfFileToken);

  return commentRanges;
}

export function isFileMagic(sourceFile: ts.SourceFile): boolean {
  // Get all comment ranges in the file
  const commentRanges = getAllCommentRanges(sourceFile);

  // Check if any comment contains @magic
  return commentRanges.some((commentRange) => {
    const commentText = sourceFile.text.slice(commentRange.pos, commentRange.end);
    return containsMagic(commentText);
  });
}

export function isFunctionMagic(node: ts.Node, sourceFile: ts.SourceFile): boolean {
  // Get leading comments trivia for the node
  const leadingCommentsTrivia = getLeadingCommentsTrivia(node, sourceFile);

  return leadingCommentsTrivia.some((commentRange) => {
    // Get comment text for each comment range
    const commentText = sourceFile.text.slice(commentRange.pos, commentRange.end);

    // Check if it contains @magic
    return containsMagic(commentText);
  });
}

