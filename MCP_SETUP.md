# AppDeploy MCP setup

This repository includes a project-level MCP configuration in `.mcp.json`:

```json
{
  "mcpServers": {
    "appdeploy": {
      "type": "http",
      "url": "https://api-v2.appdeploy.ai/mcp"
    }
  }
}
```

## Use

1. Open this repository in an MCP-compatible client.
2. Approve the `appdeploy` server when the client asks whether to trust the project configuration.
3. Complete any AppDeploy sign-in or authorization flow presented by the client.
4. Refresh the MCP tools and confirm that the AppDeploy tools are listed.

## Security

- Do not commit API keys, bearer tokens, cookies, or one-time authorization codes.
- Review every deployment action before approval.
- Keep the MCP endpoint on HTTPS.
- If the server requires authentication, use the client's secure credential or OAuth flow rather than adding secrets to `.mcp.json`.
