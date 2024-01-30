

resource "aws_amplify_app" "amplify" {
  name                     = var.tca_app_name
  repository               = var.tca_existing_repo_url
  enable_branch_auto_build = true
  access_token             = var.tca_github_access_token
  platform                 = "WEB_COMPUTE"

  build_spec = <<EOF
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
    EOF

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }

  environment_variables = {
    "_CUSTOM_IMAGE"          = "btrindadedeabreu/fp-manager:ninth",
    NEXT_PUBLIC_MONGODB_URI  = "mongodb+srv://lleroym423qsfmi:KlpJcR8dDsAImq5Y@fpmanagercluster0.rixjq6c.mongodb.net/?retryWrites=true&w=majority"
    NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000"
  }
}

resource "aws_amplify_branch" "tca_amplify_branch_main" {
  app_id      = aws_amplify_app.amplify.id
  branch_name = var.tca_amplify_branch_main_name

  framework = var.tca_amplify_app_framework
  stage     = var.tca_amplify_branch_main_stage
}
