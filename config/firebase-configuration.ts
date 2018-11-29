export default {
    projects: [
        {
            id: "notification_1",
            serverKey: "<SERVER_KEY>",
            databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
            serviceAccount: {
                type: "service_account",
                project_id: "<PROJECT_ID>",
                private_key_id: "<PRIVATE_KEY_ID>",
                private_key: "-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n",
                client_email: "foo@<PROJECT_ID>.iam.gserviceaccount.com",
                client_id: "<CLIENT_ID>",
                auth_uri: "<AUTH_URI>",
                token_uri: "<TOKEN_URI>",
                auth_provider_x509_cert_url: "<AUTH_PROVIDER_URL>",
                client_x509_cert_url: "<CLIENT_URL>"
            }
        }
    ]
}